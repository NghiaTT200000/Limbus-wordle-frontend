import GameContainer from "../../components/gameContainer"
import GameHeaderDailyMode from "./components/gameHeader"
import "../shared.css"
import GameGuesses from "../../components/gameGuesses"
import { useEffect, useState } from "react"
import apiCaller from "../../utils/apiCaller"
import useLocalGameState from "../../utils/hooks/useLocalGameState"
import React from "react"
import IIdentity from "../../utils/interfaces/IIdentity"

const DailyMode = ()=>{
    const [identities,setIdentities] = useState<IIdentity[]>([])
    const [isFetchingData,setIsFetchingData] = useState(false)
    const [fetchSuccessful,setFetchSuccessful] = useState(true)
    const {
        gameState,
        addGuess,
        newGame
    } = useLocalGameState("dailyMode","dailyModeBestStreak","dailyModeStreak")
    const [yesterDayIdentity,setYesterdayIdentity] = useState<IIdentity>()
    const [todayID,setTodayID] = useState(localStorage.getItem("todayID")||"")

    const fetchIdentities = async()=>{
        const response = await apiCaller(process.env.REACT_APP_BACKEND_URL+"/API/All");
        const result = await response.json()
        setIdentities(Object.keys(result).map((k)=>result[k]))
    }

    const getDailyIdentity = async ()=>{
        const response = await apiCaller(process.env.REACT_APP_BACKEND_URL+"/API/TodayIdentity");
        const result = await response.json()
        if(todayID!==result.todayID){
            setTodayID(result.todayID)
            newGame(result.todayIdentity)
            localStorage.setItem("todayID",result.todayID)
        }
        setYesterdayIdentity(result.yesterdayIdentity)
    }

    useEffect(()=>{
        setIsFetchingData(true)
        fetchIdentities()
            .then(getDailyIdentity)
            .catch((e)=>{
                console.log(e)
                setFetchSuccessful(false)
            })
            .finally(()=>{
                setIsFetchingData(false)
            })
    },[])

    return <GameContainer>
        {isFetchingData?
        <div className="loader-container">
            <div className="loader">
            </div>    
        </div>
        :<>
            {fetchSuccessful?
            <div className="endless-mode-container">
                <GameHeaderDailyMode addGuess={addGuess} 
                availableSuggestions={identities}
                currGuesses={gameState.totalGuesses}
                maxGuesses={gameState.maxGuesses}
                isOver={gameState.isGameOver}
                isWon={gameState.isWon}
                correctIcon={gameState.correctIdentity?.icon}
                previousCorrectIcon={yesterDayIdentity?.icon||""}
                ></GameHeaderDailyMode>
                <GameGuesses correctGuess={gameState.correctIdentity} guesses={gameState.guesses}></GameGuesses>
            </div>
            :<div>
                Error: cannot fetch data from api
            </div>}
        </>}
    </GameContainer> 
}

export default DailyMode