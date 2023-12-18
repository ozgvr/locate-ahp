export default function Sidebar({children}){
    return(
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <a class="sidebar-brand d-flex align-items-center justify-content-center">
                <div class="sidebar-brand-text mx-3">LocATE</div>
            </a>
            
            {children}

        </ul>
    );
}