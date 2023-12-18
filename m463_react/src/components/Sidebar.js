export default function Sidebar({children}){
    return(
        <ul class="navbar-nav bg-gray-900 sidebar sidebar-dark accordion" id="accordionSidebar">

            <a class="mb-5 sidebar-brand d-flex align-items-center justify-content-center" href="/">
                <div class="sidebar-brand-text mx-3">

                    <img class="mt-5" src="/logo.png" height="100px"></img>
                </div>
            </a>
            
            {children}

        </ul>
    );
}