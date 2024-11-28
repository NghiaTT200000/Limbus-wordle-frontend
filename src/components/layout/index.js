import { Route, Routes } from "react-router-dom"
import GameContainer from "../gameContainer"
import SiteHeader from "../siteHeader"
import "./layout.css"
import EndlessMode from "../../routes/endlessMode"

const Layout = ()=>{
    return <>
        <main className="layout">
            <SiteHeader></SiteHeader>
            <Routes>
                <Route index element={<EndlessMode></EndlessMode>}></Route>
            </Routes>
        </main>
    </>
    
}

export default Layout