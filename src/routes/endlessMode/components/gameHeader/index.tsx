import { useEffect, useState } from "react"
import AutoSuggestInput from "../../../../components/autoSuggestInput"
import "./gameHeader.css"
import React from "react"
import IIdentity from "../../../../utils/interfaces/IIdentity"

const GameHeaderEndlessMode = ({availableSuggestions,
    addGuess,
    currGuesses,
    maxGuesses,
    correctIcon,
    isOver,
    isWon,
    resetCb}:{
        availableSuggestions: IIdentity[],
        addGuess:(guess:IIdentity)=>void,
        currGuesses: number,
        maxGuesses: number,
        isOver: boolean,
        correctIcon:string,
        isWon:boolean,
        resetCb:()=>void
    })=>{
    const [bestStreak,setBestStreak] = useState(0)
    const [streak,setStreak]  = useState(0)

    useEffect(()=>{
        if(localStorage.getItem("endlessModeStreak")){
            setStreak(JSON.parse(localStorage.getItem("endlessModeStreak")||""))
        }
        else localStorage.setItem("endlessModeStreak",JSON.stringify(streak))
    },[localStorage.getItem("endlessModeStreak")])

    useEffect(()=>{
        if(localStorage.getItem("endlessModeBestStreak")){
            setBestStreak(JSON.parse(localStorage.getItem("endlessModeBestStreak")||""))
        }
        else localStorage.setItem("endlessModeBestStreak",JSON.stringify(bestStreak))
    },[localStorage.getItem("endlessModeBestStreak")])

    return <div className="game-header">
        <div className="game-input-container">
            <h1 className="site-header">Limbus wordle</h1>
            {isOver?
            <>
                <p>{isWon?"Congrats, you won!":"Too bad!"} The identity was:</p>
                <img className="correct-img" src={correctIcon} alt={"correct icon"} />
                <button className="main-button play-again-btn" onClick={(e)=>resetCb()}>Play again!</button>
            </>
            :<>
                <p>Tries: {currGuesses}/{maxGuesses}</p>
                <AutoSuggestInput availableSuggestions={availableSuggestions}
                submitCb={addGuess}></AutoSuggestInput>
            </>}
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