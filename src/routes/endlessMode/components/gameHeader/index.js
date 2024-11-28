import { useEffect, useState } from "react"
import AutoSuggestInput from "../../../../components/autoSuggestInput"
import "./gameHeader.css"

const GameHeaderEndlessMode = ()=>{
    const [bestStreak,setBestStreak] = useState(0)
    const [streak,setStreak]  = useState(0)

    useEffect(()=>{
        if(localStorage.getItem("streak")){
            setStreak(JSON.parse(localStorage.getItem("streak")))
        }
        else localStorage.setItem("streak",JSON.stringify(streak))
    },[localStorage.getItem("streak")])

    useEffect(()=>{
        if(localStorage.getItem("bestStreak")){
            setBestStreak(JSON.parse(localStorage.getItem("bestStreak")))
        }
        else localStorage.setItem("bestStreak",JSON.stringify(bestStreak))
    },[localStorage.getItem("bestStreak")])

    return <div className="game-header">
        <div className="game-input-container">
            <h1 className="site-header">Limbus wordle</h1>
            <p>Tries: 0/7</p>
            <AutoSuggestInput availableSuggestions={[
                {
                    img:"/img/background.jpg",
                    txt:"Hello world"
                },
                {
                    img:"/img/background.jpg",
                    txt:"Hello world"
                },
                {
                    img:"/img/background.jpg",
                    txt:"Hello world"
                },
                {
                    img:"/img/background.jpg",
                    txt:"Hello world"
                },
                {
                    img:"/img/background.jpg",
                    txt:"Hello world"
                },
                {
                    img:"/img/background.jpg",
                    txt:"Good"
                },
            ]}></AutoSuggestInput>
        </div>
        <div className="game-header-footer">
            <div className="game-header-footer-score">
                <p>Streak: {streak}</p>
                <p>Best streak: {bestStreak}</p>
            </div>
        </div>
    </div>
}

export default GameHeaderEndlessMode