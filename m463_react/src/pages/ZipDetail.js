import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import DataCard from "../components/DataCard";
import { faBuilding, faMoneyBill, faUsers } from "@fortawesome/free-solid-svg-icons";
import Map from "../components/Map";
import Card from "../components/Card";

import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        title: {
            display: false,
        },
    },
};

export default function ZipDetail({zipCode}){

    const [zipData, setZipData] = useState({});

    useEffect(() => {
        fetch("http://127.0.0.1:5000/get_zip_data/"+zipCode)
        .then(response => response.json())
        .then(data => {
            setZipData(data[0]);
        })
        .catch(error => console.log(error))
    }, [zipCode]);

    const generatePieChartData = () => {
        if (zipData.male && zipData.female) {
            const malePercentage = zipData.male * 100;
            const femalePercentage = zipData.female * 100;

            return {
                labels: ['Male', 'Female'],
                datasets: [{
                    data: [malePercentage, femalePercentage],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                    ],
                    borderWidth: 1,
                }],
            };
        }
        return null;
    };

    if (zipData.length === 0) {
        return (
            <h1>Loading...</h1>
        );
    }else{
        return(
            <>
            <h1 class="d-block h3 mb-0 text-gray-800">Zip Code {zipCode}</h1>
                <hr />
                <Row className="mb-3 py-5">
                    <Col lg={5}>
                        <Map zipCode={zipCode}/>
                    </Col>
                    <Col lg={7}>
                        <h1 class="d-block h3 mb-0 text-gray-800">Location Demographics</h1>
                        <hr />
                        <Row className="mb-3">
                            <Col lg={6} className="mb-3">
                                <DataCard title="Total Population" value={zipData.population} variant="primary" icon={faUsers} />
                            </Col>
                            <Col lg={6} className="mb-3">
                                <DataCard title="Median Rent" value={"$"+zipData.median_rent} variant="success" icon={faBuilding} />
                            </Col>
                            <Col lg={6} className="mb-3">
                                <DataCard title="Median Age" value={zipData.median_age} variant="warning" icon={faUsers} />
                            </Col>
                            <Col lg={6} className="mb-3">
                                <DataCard title="Median Household Income" value={"$"+zipData.median_income} variant="danger" icon={faMoneyBill} />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col lg={6} className="mb-3">
                                <Card title="Median Age">
                                    {zipData.median_age !== undefined &&
                                        (
                                        <Bar
                                            data={{
                                                labels: [zipCode, "Average"],
                                                datasets: [{
                                                    data: [zipData.median_age, 38.6],
                                                    backgroundColor: [
                                                        'rgba(255, 99, 132, 0.2)',
                                                        'rgba(54, 162, 235, 0.2)',
                                                    ],
                                                    borderColor: [
                                                        'rgba(255, 99, 132, 1)',
                                                        'rgba(54, 162, 235, 1)',
                                                    ],
                                                    borderWidth: 1
                                                }]
                                            }}
                                            options={{
                                                responsive: true,
                                                scales: {
                                                    y: {
                                                        display: true,
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
                                            }}
                                        />
                                    )}
                                </Card>
                            </Col>
                            <Col lg={6} className="mb-3">
                                <Card title="Crime Rate">
                                    {zipData.crime_rate !== undefined &&
                                        (
                                        <Bar
                                            data={{
                                                labels: [zipCode, "Average"],
                                                datasets: [{
                                                    data: [zipData.crime_rate, 7],
                                                    backgroundColor: [
                                                        'rgba(255, 99, 132, 0.2)',
                                                        'rgba(54, 162, 235, 0.2)',
                                                    ],
                                                    borderColor: [
                                                        'rgba(255, 99, 132, 1)',
                                                        'rgba(54, 162, 235, 1)',
                                                    ],
                                                    borderWidth: 1
                                                }]
                                            }}
                                            options={{
                                                responsive: true,
                                                scales: {
                                                    y: {
                                                        display: true,
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
                                            }}
                                        />
                                    )}
                                </Card>
                            </Col>
                            <Col lg={6} className="mb-3">
                                <Card title="Population Gender">
                                    {zipData.male !== undefined && zipData.female !== undefined && (
                                        <Pie
                                            data={generatePieChartData()}
                                            options={options}
                                        />
                                    )}
                                </Card>
                            </Col>
                            <Col lg={6} className="mb-3">
                                <Card title="Population Ethnicity">
                                    {zipData.white !== undefined && zipData.black !== undefined &&
                                    zipData.hispanic !== undefined && zipData.asian !== undefined &&
                                        (
                                        <Pie
                                            data={{
                                                labels: ["white", "black", "hispanic", "asian"],
                                                datasets: [{
                                                    data: [zipData.white, zipData.black, zipData.hispanic, zipData.asian],
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
                                    )}
                                </Card>
                            </Col>
                        </Row>

                        
                    </Col>
                </Row>
                
            </>
        );
    }

}