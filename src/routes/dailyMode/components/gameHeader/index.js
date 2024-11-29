import { useEffect, useState } from "react"
import AutoSuggestInput from "../../../../components/autoSuggestInput"
import "./gameHeader.css"

const GameHeaderDailyMode = ({availableSuggestions,
    addGuess,
    currGuesses,
    maxGuesses,
    correctIcon,
    previousCorrectIcon,
    isOver,
    isWon})=>{
    const [bestStreak,setBestStreak] = useState(0)
    const [streak,setStreak]  = useState(0)

    useEffect(()=>{
        if(localStorage.getItem("dailyModeStreak")){
            setStreak(JSON.parse(localStorage.getItem("dailyModeStreak")))
        }
        else localStorage.setItem("dailyModeStreak",JSON.stringify(streak))
    },[localStorage.getItem("dailyModeStreak")])

    useEffect(()=>{
        if(localStorage.getItem("dailyModeBestStreak")){
            setBestStreak(JSON.parse(localStorage.getItem("dailyModeBestStreak")))
        }
        else localStorage.setItem("dailyModeBestStreak",JSON.stringify(bestStreak))
    },[localStorage.getItem("dailyModeBestStreak")])

    return <div className="game-header">
        <div className="game-input-container">
            <h1 className="site-header">Limbus wordle</h1>
            {isOver?
            <>
                <p>{isWon?"Congrats, you won!":"Too bad!"} The identity was:</p>
                <img className="correct-img" src={correctIcon} alt={"correct icon"} />
                <p>Come back tommorow for another guess</p>
            </>
            :<>
                <p>Tries: {currGuesses}/{maxGuesses}</p>
                <AutoSuggestInput availableSuggestions={availableSuggestions}
                submitCb={addGuess}></AutoSuggestInput>
            </>}
        </div>
        <div className="game-header-footer">
            <p>Yesterday identity was: <img className="yesterday-correct-icon" src={previousCorrectIcon} alt="Previous correct icon" /></p>
            <div className="game-header-footer-score">
                <p>Streak: {streak}</p>
                <p>Best streak: {bestStreak}</p>
            </div>
        </div>
    </div>
}

export default GameHeaderDailyMode