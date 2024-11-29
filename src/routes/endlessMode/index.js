import GameContainer from "../../components/gameContainer"
import GameHeaderEndlessMode from "./components/gameHeader"
import "./endlessMode.css"
import "../shared.css"
import GameGuesses from "../../components/gameGuesses"
import { useEffect, useState } from "react"
import apiCaller from "../../utils/apiCaller"

const EndlessMode = ()=>{
    const [identities,setIdentities] = useState([])
    const [isFetchingData,setIsFetchingData] = useState(false)
    const [fetchSuccessful,setFetchSuccessful] = useState(true)
    const [gameState,setGameState] = useState({
        correctIdentity:{},
        guesses:[],
        totalGuesses:0,
        isGameOver:false,
        isWon:false,
        maxGuesses:7
    })

    const addGuess = (newGuess)=>{
        let isGameOver = false
        let isWon = false

        if(newGuess.name===gameState.correctIdentity.name){
            isWon=true
            isGameOver=true

            const streak = localStorage.getItem("endlessModestreak")
            const bestStreak = localStorage.getItem("endlessModeBestStreak")
            if(streak) localStorage.setItem("endlessModestreak",JSON.parse(streak)+1)
            if(bestStreak) localStorage.setItem("endlessModeBestStreak",Math.max(JSON.parse(streak)+1,JSON.parse(bestStreak)))
        } 

        if(gameState.totalGuesses+1>=gameState.maxGuesses){ 
            isGameOver=true
        }
        
        if(isGameOver&&!isWon){
            const streak = localStorage.getItem("endlessModestreak")
            if(streak) localStorage.setItem("endlessModestreak",JSON.parse(0))
        }

        setGameState({
            ...gameState,
            guesses:[newGuess,...gameState.guesses],
            totalGuesses:gameState.totalGuesses+1,
            isGameOver,
            isWon
        })
    }
    
    const resetGame = ()=>{
        const correctIdentity = (identities[Math.floor(Math.random()*identities.length)])
        setGameState({...gameState,
            correctIdentity,
            guesses:[],
            totalGuesses:0,
            isGameOver:false,
            isWon:false,
            maxGuesses:7})
    }

    const fetchIdentities = async()=>{
        setIsFetchingData(true)
        try {
            const response = await apiCaller("http://localhost:8080"+"/API/All");
            const result = await response.json()
            setIdentities(Object.keys(result).map((k)=>result[k]))
            setFetchSuccessful(true)
        } catch (error) {
            console.log(error)
            setFetchSuccessful(false)
        }
        setIsFetchingData(false)
    }

    const getGameState = ()=>{
        const endlessModeState = localStorage.getItem("endlessMode")
        if(endlessModeState){ 
            const parsedEndlessModeState=JSON.parse(endlessModeState)
            if(parsedEndlessModeState.correctIdentity)setGameState(parsedEndlessModeState)
        }
        else{
            localStorage.setItem("endlessMode",JSON.stringify(gameState))
        }
    }

    useEffect(()=>{
        fetchIdentities()
            .then(()=>{
                getGameState()
            })
    },[])

    useEffect(()=>{
        if(JSON.stringify(gameState.correctIdentity)!=="{}")localStorage.setItem("endlessMode",JSON.stringify(gameState))
    },[JSON.stringify(gameState)])

    useEffect(()=>{
        if(JSON.stringify(gameState.correctIdentity)==="{}"&&identities.length>0) resetGame()
    },[JSON.stringify(identities)])

    return <GameContainer>
        {isFetchingData?
        <div className="loader-container">
            <div className="loader">
            </div>    
        </div>
        :<>
            {fetchSuccessful?
            <div className="endless-mode-container">
                <GameHeaderEndlessMode addGuess={addGuess} 
                availableSuggestions={identities}
                currGuesses={gameState.totalGuesses}
                maxGuesses={gameState.maxGuesses}
                isOver={gameState.isGameOver}
                isWon={gameState.isWon}
                correctIcon={gameState.correctIdentity?.icon}
                resetCb={resetGame}></GameHeaderEndlessMode>
                <GameGuesses correctGuess={gameState.correctIdentity} guesses={gameState.guesses}></GameGuesses>
            </div>
            :<div>
                Error cannot fetch data from api
            </div>}
        </>}
    </GameContainer> 
}

export default EndlessMode