function Header({openSidebar}){
    return (
        <div className="app-header">
            <div className="app-title">
                <h1>Lotion</h1>
                <h5>Like Notion, but worse.</h5>
            </div>
            <div className="menu" onClick={openSidebar}>
                <p>&#9776;</p>
            </div>
        </div>
    )

}

export default Header;