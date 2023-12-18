import { Col, Row } from "react-bootstrap";
import Page from "../components/Page";
import { useState } from "react";
import ZipDetail from "./ZipDetail";
import CardScore from "../components/CardScore";



export default function Results({result, restaurantCategory, competitionGoal}){

    const cousines = ["bakery","meat","juices","cafe","chicken","foreign","vegetarian","hamburger","mixed","dessert","pizza","seafood","soup","sandwich"]

    const [selectedZip, setSelectedZip] = useState(null);

    function handleSelect(zipCode) {
        setSelectedZip(zipCode);
    }

    const competition = competitionGoal === 0 ? "maximium" : "minimum";
    const restaurant = cousines[restaurantCategory].charAt(0).toUpperCase() + cousines[restaurantCategory].slice(1);

    const description = "The following zip codes are the top areas for " + restaurant + " restaurants with " + competition + " competition. Click on a zip code to see more details about the area.";

    return(
        <Page title="Results" description={description}>
            <Row>
                {result && result.map((item, index) => (
                    <Col key={index} lg={3} className="mb-4" onClick={() => handleSelect(item[0])}>
                        <CardScore rank={"#"+(index+1)} zip={item[0]} restaurantCategory={restaurantCategory} competitionGoal={competitionGoal}>
                        </CardScore>
                    </Col>
                ))}
            </Row>
            <Row>
                <Col>
                    { selectedZip && 
                        <ZipDetail zipCode={selectedZip}/>
                    }
                </Col>
            </Row>
        </Page>
    );
}