export default function Navbar(){
    return(
        <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <form
                class="d-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 w-100 navbar-search">
                <div class="input-group">
                    <input type="text" class="form-control bg-light border-0 small" placeholder="Search for zip code..."
                        aria-label="Search" aria-describedby="basic-addon2" />
                </div>
            </form>
        </nav>
    )
}