export default function WeightRangeForm() {
    
    return(
        <>
            <h4 class="small font-weight-bold">Server Migration <span class="float-right">20%</span></h4>
            <div class="progress mb-4">
            <div class="progress-bar bg-danger" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <h4 class="small font-weight-bold">Sales Tracking <span
            class="float-right">40%</span></h4>
            <div class="progress mb-4">
            <div class="progress-bar bg-warning" role="progressbar"
            aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <h4 class="small font-weight-bold">Customer Database <span
            class="float-right">60%</span></h4>
            <div class="progress mb-4">
            <div class="progress-bar" role="progressbar"
            aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <h4 class="small font-weight-bold">Payout Details <span
            class="float-right">80%</span></h4>
            <div class="progress mb-4">
            <div class="progress-bar bg-info" role="progressbar"
            aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <h4 class="small font-weight-bold">Account Setup <span
            class="float-right">Complete!</span></h4>
            <div class="progress">
            <div class="progress-bar bg-success" role="progressbar"
            aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </>
    );
}