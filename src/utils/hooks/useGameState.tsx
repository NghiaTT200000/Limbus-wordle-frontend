import { useCallback, useEffect, useState } from "react";
import IGameState from "../interfaces/IGameState";
import IIdentity from "../interfaces/IIdentity";


export default function useGameState({gameStateLocalName,bestStreakLocalName,streakLocalName}:{
    gameStateLocalName:string,
    bestStreakLocalName:string,
    streakLocalName:string
}):{
    gameState:IGameState,
    setGameState:(g:IGameState)=>void,
    addGuess:(g:IIdentity)=>void,
    newGame:(g:IIdentity)=>void
} {
    const [gameState,setGameState] = useState<IGameState>(()=>{
        const dailyMode = localStorage.getItem(gameStateLocalName)
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

    const addGuess =useCallback((newGuess:IIdentity)=>{
        let isGameOver = false
        let isWon = false

        if(newGuess.name===gameState.correctIdentity.name){
            isWon=true
            isGameOver=true

            const streak = localStorage.getItem(streakLocalName)
            const bestStreak = localStorage.getItem(bestStreakLocalName)
            if(streak) localStorage.setItem(streakLocalName,JSON.parse(streak)+1)
            if(bestStreak&&streak) localStorage.setItem(bestStreakLocalName,String(Math.max(JSON.parse(streak)+1,JSON.parse(bestStreak))))
        } 

        if(gameState.totalGuesses+1>=gameState.maxGuesses){ 
            isGameOver=true
        }
        
        if(isGameOver&&!isWon){
            const streak = localStorage.getItem(streakLocalName)
            if(streak) localStorage.setItem(streakLocalName,JSON.parse(streak)+1)
        }

        setGameState({
            ...gameState,
            guesses:[newGuess,...gameState.guesses],
            totalGuesses:gameState.totalGuesses+1,
            isGameOver,
            isWon
        })
    },[setGameState,gameState,streakLocalName,bestStreakLocalName])

    const newGame = useCallback((newCorrectGuess:IIdentity)=>{
        setGameState({...gameState,
            correctIdentity:newCorrectGuess,
            guesses:[],
            totalGuesses:0,
            isGameOver:false,
            isWon:false,
            maxGuesses:7})
    },[setGameState,gameState])

    const getLocalGameState =useCallback(()=>{
        const endlessModeState = localStorage.getItem(gameStateLocalName)
        if(endlessModeState){ 
            const parsedEndlessModeState=JSON.parse(endlessModeState)
            if(parsedEndlessModeState.correctIdentity)setGameState(parsedEndlessModeState)
        }
        else{
            localStorage.setItem(gameStateLocalName,JSON.stringify(gameState))
        }
    },[gameStateLocalName])

    useEffect(()=>{
        getLocalGameState()
    },[])

    useEffect(()=>{
        localStorage.setItem(gameStateLocalName,JSON.stringify(gameState))
    },[JSON.stringify(gameState)])

    return {
        gameState,
        setGameState,
        addGuess,
        newGame
    }
}