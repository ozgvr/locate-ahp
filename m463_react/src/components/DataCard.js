import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "react-bootstrap";

export default function DataCard({title, value, variant, icon}){

    return(
        <Card className={"card border-left-"+variant+" shadow h-100 py-2"}>
            <div class="card-body">
                <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class={"text-xs font-weight-bold text-"+variant+" text-uppercase mb-1"}>
                            {title}</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">{value}</div>
                    </div>
                    <div class="col-auto">
                        <FontAwesomeIcon icon={icon} className="fa-2x text-gray-300" />
                    </div>
                </div>
            </div>
        </Card>
    );

}