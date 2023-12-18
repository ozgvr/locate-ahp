import Footer from "./Footer";
import SidebarLink from "./SidebarLink";
import Sidebar from "./Sidebar";

export default function Layout({children}){
    return(
        <html lang="en">

    <head>

        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        <title>LocATE</title>

        <link
            href="https://fonts.googleapis.com/css?family=Mulish:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
            rel="stylesheet" />

        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
            integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
            crossorigin=""/>

        <link href="css/sb-admin-2.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    </head>

    <body id="page-top">

        <div id="wrapper">
            
            <Sidebar>
                <SidebarLink title="Analyze" link="/analyze"/>
                <SidebarLink title="Explore" link="/explore"/>
            </Sidebar>

            <div id="content-wrapper" class="d-flex flex-column">

                <div id="content">

                    

                    <div class="container-fluid">
                        {children}
                    </div>

                </div>

                <Footer/>

            </div>

        </div>
    </body>

    </html>
    );
}