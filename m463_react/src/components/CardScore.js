import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

export default function CardScore({ rank, zip, restaurantCategory, competitionGoal}) {

    const [scores, setScores] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/get_zip_score/"+zip+"/"+restaurantCategory+"/"+competitionGoal)
        .then(response => response.json())
        .then(data => {
            setScores(data);
        })
    }, [zip, restaurantCategory, competitionGoal]);

    return (
        <Card className="card shadow h-100 pt-2">
            <div class="card-body">
                <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class="h5 mb-0 font-weight-bold text-gray-800">Zip {zip}</div>
                    </div>
                    <div  class="col-auto">
                        <h2 class="font-weight-bold text-gray-400 text-uppercase mb-1">{rank}</h2>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                {scores && Object.entries(scores).map((score, index) => {
                    return (
                        <div className="row no-gutters align-items-center">
                            <div className="col">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    {score[0]}</div>
                            </div>
                            <div className="col-auto">
                                <div className="text-xs font-weight-bold text-gray-600 text-uppercase mb-1">
                                    {score[1].toFixed(2)} / 9</div>
                            </div>
                        </div>
                    )
                    })
                }
            </div>

        </Card>
    )
}