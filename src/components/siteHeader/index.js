import { Link } from "react-router-dom"
import "./siteHeader.css"

const SiteHeader = ()=>{

    return <header className="header">
        <Link to={"/"}>
            <button className="nav-btn main-button">
                Daily
            </button>
        </Link>
        <Link to={"/endless"}>
            <button className="nav-btn main-button">
                Endless
            </button>
        </Link>
        <a href="https://ko-fi.com/johnlimbusidmaker" className="donate-header-button">
            <button className="nav-btn main-button">
                <img src={"/img/kofi_s_logo.png"} alt="kofi_icon"/>
                <p>Support me</p>
            </button>
        </a>
    </header>
}

export default SiteHeader