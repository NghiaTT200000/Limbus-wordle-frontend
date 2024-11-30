import { Link } from "react-router-dom"
import "./siteHeader.css"

const SiteHeader = ()=>{

    return <header className="header">
        <Link to={"/"}>
            <button className="main-button">
                Daily
            </button>
        </Link>
        <Link to={"/endless"}>
            <button className="main-button">
                Endless
            </button>
        </Link>
        <a href="https://ko-fi.com/johnlimbusidmaker" className="donate-header-button">
            <button className="main-button">
                <img src={"/img/kofi_s_logo.png"} alt="kofi_icon"/>
                <p>Support me</p>
            </button>
        </a>
    </header>
}

export default SiteHeader