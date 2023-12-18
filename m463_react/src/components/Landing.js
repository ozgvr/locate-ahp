import React from 'react';
import { Link } from 'react-router-dom';
import image from "./logo-white.png";
import burok from "./burak.jpeg";
import zeynep from "./zeynep.jpeg";
import ozgur from "./ozgur.jpeg";
import arda from "./arda.jpeg";
import cuno from "./cuneyt.png";
import yusuf from "./yusuf.jpeg";




const Landing = () => {
    return (
        <div style={{ background: 'linear-gradient(225deg, #e52aa0 0%, #399ddb 100%)', backgroundSize: "cover" }}>
            {/* Main Landing Section */}
            <div className="text-center vh-100 d-flex flex-column justify-content-center align-items-center text-white">
                <img src={image} alt="Logo" className="mb-4" style={{ maxWidth: '200px' }} />
                <h1 className="display-2 fw-bold">Restaurant Location <br /> Optimizer</h1>
                <h4 className="mt-5 fs-4 fw-normal">Select your restaurant type and get the <br /> optimal locations for your new branch!</h4>
                
            </div>

           {/* How It Works Section */}
            <div className="text-center text-white py-5 mt-3">
                <h1 className="mb-4 display-4">How does it work?</h1>
                <h5 className='mt-3'>
                <ol className="mx-auto text-left px-5 fs-5 mt-3" style={{ maxWidth: '800px' }}>
                    <li className='mt-3'>After you click on the "Get Started" button, and you will land on our "Analyze" page.</li>
                    <ul className='mt-3'>
                        <li className='mt-3'>First, you need to select the type of the restaurant you want to open.</li>
                        <li>Then, decide how important each metric is for you comparatively and select it from the range.</li>
                        <li>After that, state whether you want the competition to be maximized or minimized.</li>
                    </ul>
                    <li className='mt-3'>When you click on the "Get Results" button on the "Analyze" page, you will be directed to the results page.</li>
                    <ul className='mt-3'>
                        <li>On this page, you will get 4 suggestions for the most optimal locations where you could open up your branch.</li>
                        <li>You can click on these suggestions and see detailed analysis about the area as well as visualizing it on the map.</li>
                    </ul>
                    <li className='mt-3'>If you're interested in any other specific areas, you can click on the "Explore" page and get detailed information about all the areas in NYC.</li>
                </ol>
                </h5>

                <Link to="/analyze" className="nav-link">
                    <button className="btn btn-dark rounded-pill mt-4 px-5 py-3">Get Started!</button>
                </Link>
            </div>


            {/* About Us Section */}
            <div className="text-center text-white py-5">
                <h2 className="mb-4 display-4 mb-5">About Us</h2>
                <div className="row justify-content-center mt-3">
                    {/* Team Member Sections */}

                    <div className="col-md-4 mb-3">
                        <img src={ozgur} alt="Team Member 1" className="img-fluid rounded-circle" style={{ maxWidth: '250px' }}/>
                        <p className='mt-2'>Özgür Akın</p>
                        {/* Social Media Links for Team Member 1 */}
                    </div>
                    <div className="col-md-4 mb-3">
                        <img src={zeynep} alt="Team Member 2" className="img-fluid rounded-circle " style={{ maxWidth: '250px' }}/>
                        <p className='mt-2'>Zeynep Sena Tınaz</p>
                        {/* Social Media Links for Team Member 2 */}
                    </div>
                    <div className="col-md-4 mb-3">
                        <img src={burok} alt="Team Member 3" className="img-fluid rounded-circle"style={{ maxWidth: '250px' }} />
                        <p className='mt-2'>Burak Can Erten</p>
                        {/* Social Media Links for Team Member 3 */}
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-4 mb-3">
                        <img src={cuno} alt="Team Member 4" className="img-fluid rounded-circle" style={{ maxWidth: '250px' }}/>
                        <p className='mt-2'>Cüneyt Uzunsakal</p>
                        {/* Social Media Links for Team Member 4 */}
                    </div>
                    <div className="col-md-4 mb-3">
                        <img src={arda} alt="Team Member 5" className="img-fluid rounded-circle" style={{ maxWidth: '250px' }}/>
                        <p className='mt-2'>Arda Uslu</p>
                        {/* Social Media Links for Team Member 5 */}
                    </div>
                    <div className="col-md-4 mb-3">
                        <img src={yusuf} alt="Team Member 6" className="img-fluid rounded-circle" style={{ maxWidth: '250px' }}/>
                        <p className='mt-2'>Yusuf Eroğlu</p>
                        {/* Social Media Links for Team Member 6 */}
                    </div>

                    {/* Repeat for each team member */}
                </div>
            </div>

            <footer class="sticky-footer ">
            <div class="container my-auto">
                <div class="copyright text-center my-auto text-white">
                    <span>Copyright &copy; LocATE 2023</span>
                </div>
            </div>
        </footer>


        </div>
    );
};

export default Landing;
