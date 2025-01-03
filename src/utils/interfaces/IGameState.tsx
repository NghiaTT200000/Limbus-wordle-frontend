import IIdentity from "./IIdentity"

export default interface IGameState{
    correctIdentity:IIdentity,
    guesses:IIdentity[]
    isGameOver:boolean,
    isWon:boolean,
    maxGuesses:number,
    totalGuesses:number
}