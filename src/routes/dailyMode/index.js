import GameContainer from "../../components/gameContainer"
import GameHeaderDailyMode from "./components/gameHeader"
import "../shared.css"
import GameGuesses from "../../components/gameGuesses"
import { useEffect, useState } from "react"
import apiCaller from "../../utils/apiCaller"

const DailyMode = ()=>{
    const [identities,setIdentities] = useState([])
    const [isFetchingData,setIsFetchingData] = useState(false)
    const [fetchSuccessful,setFetchSuccessful] = useState(true)
    const [gameState,setGameState] = useState(()=>{
        const dailyMode = localStorage.getItem("dailyMode")
        if(!dailyMode)return ({
            correctIdentity:{},
            guesses:[],
            totalGuesses:0,
            isGameOver:false,
            isWon:false,
            maxGuesses:7
        })
        else {
            return JSON.parse(dailyMode)
        }
    })
    const [yesterDayIdentity,setYesterdayIdentity] = useState({})
    const [todayID,setTodayID] = useState(localStorage.getItem("todayID")||"")

    const addGuess = (newGuess)=>{
        let isGameOver = false
        let isWon = false

        if(newGuess.name===gameState.correctIdentity.name){
            isWon=true
            isGameOver=true

            const streak = localStorage.getItem("dailyModestreak")
            const bestStreak = localStorage.getItem("dailyModeBestStreak")
            if(streak) localStorage.setItem("dailyModestreak",JSON.parse(streak)+1)
            if(bestStreak) localStorage.setItem("dailyModeBestStreak",Math.max(JSON.parse(streak)+1,JSON.parse(bestStreak)))
        } 

        if(gameState.totalGuesses+1>=gameState.maxGuesses){ 
            isGameOver=true
        }
        
        if(isGameOver&&!isWon){
            const streak = localStorage.getItem("dailyModestreak")
            if(streak) localStorage.setItem("dailyModestreak",JSON.parse(0))
        }

        setGameState({
            ...gameState,
            guesses:[newGuess,...gameState.guesses],
            totalGuesses:gameState.totalGuesses+1,
            isGameOver,
            isWon
        })
    }

    const resetGame = (newCorrectGuess)=>{
        setGameState({...gameState,
            correctIdentity:newCorrectGuess,
            guesses:[],
            totalGuesses:0,
            isGameOver:false,
            isWon:false,
            maxGuesses:7})
    }

    const fetchIdentities = async()=>{
        const response = await apiCaller("http://localhost:8080"+"/API/All");
        const result = await response.json()
        setIdentities(Object.keys(result).map((k)=>result[k]))
    }

    const getDailyIdentity = async ()=>{
        const response = await apiCaller("http://localhost:8080"+"/API/TodayIdentity");
        const result = await response.json()
        if(todayID!==result.todayID){
            setTodayID(result.todayID)
            resetGame(result.todayIdentity)
            localStorage.setItem("todayID",result.todayID)
        }
        setYesterdayIdentity(result.yesterdayIdentity)
    }

    const getGameState = ()=>{
        const endlessModeState = localStorage.getItem("dailyMode")
        if(endlessModeState){ 
            const parsedEndlessModeState=JSON.parse(endlessModeState)
            if(parsedEndlessModeState.correctIdentity)setGameState(parsedEndlessModeState)
        }
        else{
            localStorage.setItem("dailyMode",JSON.stringify(gameState))
        }
    }

    useEffect(()=>{
        setIsFetchingData(true)
        fetchIdentities()
            .then(getGameState)
            .then(getDailyIdentity)
            .catch((e)=>{
                console.log(e)
                setFetchSuccessful(false)
            })
            .finally(()=>{
                setIsFetchingData(false)
            })
    },[])

    useEffect(()=>{
        localStorage.setItem("dailyMode",JSON.stringify(gameState))
    },[JSON.stringify(gameState)])

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