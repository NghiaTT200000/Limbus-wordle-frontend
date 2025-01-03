import GameContainer from "../../components/gameContainer"
import GameHeaderEndlessMode from "./components/gameHeader"
import "./endlessMode.css"
import "../shared.css"
import GameGuesses from "../../components/gameGuesses"
import { useEffect, useState } from "react"
import apiCaller from "../../utils/apiCaller"
import useLocalGameState from "../../utils/hooks/useLocalGameState"
import React from "react"
import IIdentity from "../../utils/interfaces/IIdentity"

const EndlessMode = ()=>{
    const [identities,setIdentities] = useState<IIdentity[]>([])
    const [isFetchingData,setIsFetchingData] = useState(false)
    const [fetchSuccessful,setFetchSuccessful] = useState(true)
    const {
        gameState,
        addGuess,
        newGame
    } = useLocalGameState("endlessMode","endlessModeBestStreak","endlessModeStreak")

    const resetGame = ()=>{
        const correctIdentity = (identities[Math.floor(Math.random()*identities.length)])
        newGame(correctIdentity)
    }

    const fetchIdentities = async()=>{
        const response = await apiCaller(process.env.REACT_APP_BACKEND_URL+"/API/All");
        const result = await response.json()
        setIdentities(Object.keys(result).map((k)=>result[k]))
    }

    useEffect(()=>{
        setIsFetchingData(true)
        fetchIdentities()
            .catch((e)=>{
                console.log(e)
                setFetchSuccessful(false)
            })
            .finally(()=>{
                setIsFetchingData(false)
            })
    },[])

    useEffect(()=>{
        if((!gameState.correctIdentity||JSON.stringify(gameState.correctIdentity)==="{}")&&identities.length>0)resetGame()
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