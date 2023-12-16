from flask import Flask, request, jsonify
from ahpy import Compare
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Reading data from CSV
file = pd.read_csv("zipdata.csv")

# Define criteria and restaurant types
criterias = ["crime", "rent", "income", "competition"]
cousines = ["bakery","meat","juices","cafe","chicken","foreign","vegetarian","hamburger","mixed","dessert","pizza","seafood","soup","sandwich"]

# Extracting data from the file
zip_codes = file["zip"].tolist()
crime = file["crime"].tolist()
rent = file["rent"].tolist()
income = file["income"].tolist()

# Function to initialize comparisons based on crime, rent, and income
def initialize_comparisons():

    # Dictionary to hold comparisons
    comparisons = {
        "criteria": {},
        "crime": {},
        "rent": {},
        "income": {},
        "competition": {}
    }

    for i in range(len(zip_codes)):
        for j in range(i+1, len(zip_codes)):
            comparisons["crime"][(zip_codes[i], zip_codes[j])] = crime[i] / crime[j]
            comparisons["rent"][(zip_codes[i], zip_codes[j])] = rent[i] / rent[j]
            comparisons["income"][(zip_codes[i], zip_codes[j])] = income[i] / income[j]

    return comparisons

# Function to generate comparison matrix based on user input
def generate_comparison_matrix(data):

    comparisons = initialize_comparisons()

    # Initializing default pairwise comparisons
    comparisons_data = {
        "crime_rent": 1.0,
        "crime_income": 1.0,
        "crime_competition": 1.0,
        "rent_income": 1.0,
        "rent_competition": 1.0,
        "income_competition": 1.0
    }        

    # Extract user pairwise comparisons from request
    for key in comparisons_data.keys():
        comparisons_data[key] = data.get(key, 1.0)

    # Convert comparisons to AHP format
    for key, value in comparisons_data.items():
        value = float(value)
        if(value < 0):
            value = (5-(abs(value)))/5
        else:
            value = 1+(value)
        criteria_key = key.split("_")
        comparisons["criteria"][(criteria_key[0], criteria_key[1])] = value

    return comparisons

# Function to compare restaurants based on restaurant type and desired competition goal
# competition_goal = 1 -> more competition
# competition_goal = 2 -> less competition
def compare_restaurants(comparisons, restaurant_type, competition_goal):
    restaurant = file[restaurant_type].tolist()
    for i in range(len(zip_codes)):
        for j in range(i+1, len(zip_codes)):
            if competition_goal == "1":
                comparisons["competition"][(zip_codes[i], zip_codes[j])] = restaurant[j] / restaurant[i]
            else:
                comparisons["competition"][(zip_codes[i], zip_codes[j])] = restaurant[i] / restaurant[j]

# Initialize comparisons on startup
initialize_comparisons()

# REST API endpoints

# Generate AHP report based on selected criteria 
@app.route("/ahp_report", methods=["POST"])
def calculate_ahp():

    # Extract data from the request
    req_data = request.json
    restaurant_type = cousines[int(req_data.get("restaurant_type", 0))]
    competition_goal = req_data.get("competition_goal", 0)
    
    # Gather pairwise comparisons from user
    comparisons = generate_comparison_matrix(req_data)

    # Function to compare restaurants based on restaurant type and desired competition goal
    # competition_goal = 1 -> more competition
    # competition_goal = 2 -> less competition
    compare_restaurants(comparisons, restaurant_type, competition_goal)

    # Generate AHP report
    criteria = Compare("Criteria", comparisons["criteria"], precision=10)
    criteria.add_children([Compare(criteria, comparisons[criteria], precision=10) for criteria in criterias])
    report = criteria.report(show=True)
    
    # Prepare response
    response = {
        "restaurant_type": restaurant_type,
        "ahp_report": report
    }
    
    return jsonify(response)

# Get relative weights and consistency ratio of criteria
@app.route("/ahp_weights", methods=["POST"])
def weights():
    # Extract data from the request
    req_data = request.json
    
    # Gather pairwise comparisons from user
    comparisons = generate_comparison_matrix(req_data)

    # Create AHP object and calculate consistency ratio & global weights
    criteria = Compare("Criteria", comparisons["criteria"], precision=10)
    criteria.consistency_ratio
    criteria.global_weights

    weights = {
        "Security": criteria.global_weights["crime"],
        "Cost": criteria.global_weights["rent"],
        "Wealth": criteria.global_weights["income"],
        "Competition": criteria.global_weights["competition"]
    }
    
    # Prepare response
    response = {
        "consistency_ratio": criteria.consistency_ratio,
        "global_weights": weights
    }
    
    return jsonify(response)


# Get all data of a ZIP code
@app.route("/get_zip_data/<zip_code>", methods=["GET"])
def get_zip_data(zip_code):
    if zip_code in file["zip"].astype(str).values:
        selected_row = file[file["zip"] == int(zip_code)]
        return jsonify(selected_row.to_dict(orient="records"))
    else:
        return jsonify({"error": "ZIP code not found"}), 404


# Get scores of a ZIP code for a given restaurant type and competition goal
@app.route("/get_zip_score/<zip_code>/<restaurant_type>/<competition_goal>", methods=["GET"])
def get_zip_score(zip_code, restaurant_type, competition_goal):
    if zip_code in file["zip"].astype(str).values:
        selected_row = file[file["zip"] == int(zip_code)]
        competition = selected_row[cousines[int(restaurant_type)]].values[0]
        if competition_goal == "1":
            competition = 10-competition
        crime = selected_row["crime"].values[0]
        rent = selected_row["rent"].values[0]
        income = selected_row["income"].values[0]
        return jsonify({
            "competition": competition,
            "crime": crime,
            "rent": rent,
            "income": income
        })
    else:
        return jsonify({"error": "ZIP code not found"}), 404

    
if __name__ == "__main__":
    app.run(debug=True)
