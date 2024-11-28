import "./gameGuesses.css"

const GameGuesses = ({guesses})=>{
    return <div className="guess-container">
        <div className="guess">ID</div>
        <div className="guess">Skills</div>
        <div className="guess">Sinner</div>

        {guesses.map(guess=><>
            <div className="guess">
                <img className="guess-img" src={guess.idIcon} alt={guess.name+" icon"} />
            </div>
            <div className="guess-skill-container">
                <div className="guess-skill"></div>
                <div className="guess-skill">Skill 1</div>
                <div className="guess-skill">Skill 2</div>
                <div className="guess-skill">Skill 3</div>
                
                <div className="guess-skill">Affinity</div>
                <div className="guess-skill">
                    <img className="guess-skill-img" src={guess.skill[0].affinityIcon} alt="affinity icon" />
                </div>
                <div className="guess-skill">
                    <img className="guess-skill-img" src={guess.skill[0].affinityIcon} alt="affinity icon" />
                </div>
                <div className="guess-skill">
                    <img className="guess-skill-img" src={guess.skill[0].affinityIcon} alt="affinity icon" />
                </div>
                
                <div className="guess-skill">
                    Attack type
                </div>
                <div className="guess-skill">
                    <img className="guess-skill-img" src={guess.skill[1].attackIcon} alt="attack icon" />
                </div>
                <div className="guess-skill">
                    <img className="guess-skill-img" src={guess.skill[1].attackIcon} alt="attack icon" />
                </div>
                <div className="guess-skill">
                    <img className="guess-skill-img" src={guess.skill[1].attackIcon} alt="attack icon" />
                </div>
                
                <div className="guess-skill">Coin count</div>
                <div className="guess-skill">{guess.skill[2].coinCount}</div>
                <div className="guess-skill">{guess.skill[2].coinCount}</div>
                <div className="guess-skill">{guess.skill[2].coinCount}</div>
            </div>
            <div className="guess">
                <img className="guess-img" src={guess.sinnerIcon} alt={"sinner icon"} />
            </div>
        </>)}

      
    </div>
}

export default GameGuesses