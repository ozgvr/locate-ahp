import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import Card from "../components/Card";
import Page from "../components/Page";
import { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    scales: {
        y: {
            display: false,
        }
    },
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
};

export default function Analyze({setResult, setAhpReport, restaurantCategory, setRestaurantCategory, competitionGoal, setCompetitionGoal}){

    const cousines = ["bakery","meat","juices","cafe","chicken","foreign","vegetarian","hamburger","mixed","dessert","pizza","seafood","soup","sandwich"]

    const [consistency, setConsistency] = useState(null);
    const [weights, setWeights] = useState({
        "Security": 0.25,
        "Cost": 0.25,
        "Wealth": 0.25,
        "Competition": 0.25,
    });

    const [criteriaWeights, setCriteriaWeights] = useState({
        "crime_rent": 0,
        "crime_competition": 0,
        "crime_income": 0,
        "rent_income": 0,
        "rent_competition": 0,
        "income_competition": 0,
    });

    const getResults = () => {
        const userData = criteriaWeights;
        userData["restaurant_type"] = restaurantCategory;
        userData["competition_goal"] = competitionGoal;
        
        try{
            fetch("http://127.0.0.1:5000/ahp_report", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            })
            .then(response => response.json())
            .then(data => {
                setAhpReport(data.ahp_report);
                const targetWeights = Object.entries(data.ahp_report.target_weights)
                const result = targetWeights.sort((a, b) => b[1] - a[1]).slice(0, 4);
                setResult(result);
                }
            );
        }catch(e){
            console.log(e);
        }
    }



    useEffect(() => {
        try{
            fetch("http://127.0.0.1:5000/ahp_weights", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(criteriaWeights)
            })
            .then(response => response.json())
            .then(data => {
                    setWeights(data.global_weights);
                    setConsistency(data.consistency_ratio);
                }
            );
        }catch(e){
            console.log(e);
        }
    }, [criteriaWeights]);

    const handleRestaurantCategoryChange = (e) => {
        setRestaurantCategory(e.target.value);
    };

    const handleCompetitionGoalChange = (e) => {
        setCompetitionGoal(e.target.value);
    };

    const handleCriteriaChange = (e) => {
        const { name, value } = e.target;
        setCriteriaWeights({ ...criteriaWeights, [name]: parseFloat(value) });
    };

    return(
        <Page title="Analyze">
            <Row>
                <Col md={8} className="mb-3">
                    <Card title="Restaurant Category">
                        <Form.Select className="form-control" onChange={handleRestaurantCategoryChange}>
                            {
                            cousines.map((cousine, index) => (
                                <option value={index}>{cousine.charAt(0).toUpperCase()+cousine.slice(1)}</option>
                            ))
                            }
                        </Form.Select>
                    </Card>
                </Col>
                <Col md={4} className="mb-3">
                    <Card title="Competition Goal">
                        <div className="d-flex">
                            <div className="form-group">
                                <Form.Check
                                    inline
                                    type="radio"
                                    id="competition_goal0"
                                    name="competition_goal"
                                    label={`Maximize`}
                                    value="0"
                                    onChange={handleCompetitionGoalChange}
                                    checked="true"
                                />                            
                                <Form.Check
                                    inline
                                    type="radio"
                                    id="competition_goal1"
                                    name="competition_goal"
                                    label={`Minimize`}
                                    value="1"
                                    onChange={handleCompetitionGoalChange}
                                />                            
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col md={8} className="mb-3">
                    <Card title="Criteria weights">
                        <table class="table table-borderless">
                            <tbody>
                                <tr>
                                    <td class="text-end">Cost</td>
                                    <td class="w-100">
                                        <Form.Control type="range" name="crime_rent" onChange={handleCriteriaChange} className="form-range mx-3" min="-4" max="4" step="0.05"/>                    
                                    </td>
                                    <td class="text-start ps-4">Security</td>
                                </tr>
                                <tr>
                                    <td class="text-end">Competition</td>
                                    <td class="w-100">
                                        <Form.Control type="range" name="crime_competition" onChange={handleCriteriaChange} className="form-range mx-3" min="-4" max="4" step="0.05"/>                    
                                    </td>
                                    <td class="text-start ps-4">Security</td>
                                </tr>
                                <tr>
                                    <td class="text-end">Wealth</td>
                                    <td class="w-100">
                                        <Form.Control type="range" name="crime_income" onChange={handleCriteriaChange} className="form-range mx-3" min="-4" max="4" step="0.05"/>                    
                                    </td>
                                    <td class="text-start ps-4">Security</td>
                                </tr>
                                <tr>
                                    <td class="text-end">Wealth</td>
                                    <td class="w-100">
                                        <Form.Control type="range" name="rent_income" onChange={handleCriteriaChange} className="form-range mx-3" min="-4" max="4" step="0.05"/>                    
                                    </td>
                                    <td class="text-start ps-4">Cost</td>
                                </tr>
                                <tr>
                                    <td class="text-end">Competition</td>
                                    <td class="w-100">
                                        <Form.Control type="range" name="rent_competition" onChange={handleCriteriaChange} className="form-range mx-3" min="-4" max="4" step="0.05"/>                    
                                    </td>
                                    <td class="text-start ps-4">Cost</td>
                                </tr>
                                <tr>
                                    <td class="text-end">Competition</td>
                                    <td class="w-100">
                                        <Form.Control type="range" name="income_competition" onChange={handleCriteriaChange} className="form-range mx-3" min="-4" max="4" step="0.05"/>                    
                                    </td>
                                    <td class="text-start ps-4">Wealth</td>
                                </tr>
                            </tbody>
                        </table>
                    </Card>
                </Col>
                <Col md={4} className="mb-3">
                    <Card title="Relative weights">
                        <Bar className="mb-3"
                            data={{
                                labels: ["Security", "Cost", "Wealth", "Competition"],
                                datasets: [{
                                    label: 'Relative weights',
                                    data: weights,
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                    ],
                                    borderWidth: 1
                                }]
                            }}
                            options={options}
                        />
                        { consistency > 0.1 && <Alert variant="danger">Consistency ratio is too high: {consistency}</Alert>}
                        { consistency <= 0.1 && <Alert variant="success">Consistency ratio: {consistency}</Alert>}
                    </Card>
                </Col>
            </Row>
            <Button onClick={getResults} disabled={!(consistency!=null && consistency<=0.1)}>Get Results</Button>
        </Page>
    );
}