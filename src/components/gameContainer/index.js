import "./gameContainer.css"

const GameContainer=({children})=>{
    return <div className="game-container">
        <div className="game">
            {children}
        </div>
    </div>
}

export default GameContainer