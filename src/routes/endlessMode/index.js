import GameContainer from "../../components/gameContainer"
import GameHeaderEndlessMode from "./components/gameHeader"
import "./endlessMode.css"
import "../shared.css"
import GameGuesses from "../../components/gameGuesses"

const EndlessMode = ()=>{
    return <GameContainer>
        <div className="endless-mode-container">
            <GameHeaderEndlessMode></GameHeaderEndlessMode>
            <GameGuesses guesses={[]}></GameGuesses>
        </div>
    </GameContainer> 
}

export default EndlessMode