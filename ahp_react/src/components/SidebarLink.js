import { Link } from "react-router-dom";

export default function SidebarLink({title, link}){
    return(
        <>
            <li class="nav-item active">
                <Link to={link} class="nav-link">
                    <span>{title}</span>
                </Link>
            </li>

            <hr class="sidebar-divider my-0"/>
        </>
    );
}