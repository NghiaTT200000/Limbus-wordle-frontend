import { Route, Routes } from "react-router-dom"
import SiteHeader from "../siteHeader"
import "./layout.css"
import EndlessMode from "../../routes/endlessMode"
import DailyMode from "../../routes/dailyMode"

const Layout = ()=>{
    return <>
        <main className="layout">
            <SiteHeader></SiteHeader>
            <Routes>
                <Route path="/endless" element={<EndlessMode></EndlessMode>}></Route>
                <Route index element={<DailyMode></DailyMode>}></Route>
            </Routes>
        </main>
    </>
    
}

export default Layout