import "./gameGuesses.css"

const GameGuesses = ({correctGuess,guesses})=>{
    return <div className="guess-container">
        <div className="guess">ID</div>
        <div className="guess">Skills</div>
        <div className="guess">Sinner</div>

        {guesses.map((guess,i)=><>
            <div key={i} className={`guess ${correctGuess.name===guess.name?"correct":"incorrect"}`}>
                <img className="guess-img" src={guess.icon} alt={guess.name+" icon"} />
            </div>
            <div className="guess-skill-container">
                <div className="guess-skill"></div>
                <div className="guess-skill">Skill 1</div>
                <div className="guess-skill">Skill 2</div>
                <div className="guess-skill">Skill 3</div>
                
                <div className="guess-skill">Affinity</div>
                <div className={`guess-skill ${correctGuess.skills[0].sinAffinity === guess.skills[0].sinAffinity ? "correct" : "incorrect"}`}>
                    <img className="guess-skill-img" src={`/img/sin-affinity/affinity_${guess.skills[0].sinAffinity}_big.webp`} alt="affinity icon" />
                </div>
                <div className={`guess-skill ${correctGuess.skills[1].sinAffinity === guess.skills[1].sinAffinity ? "correct" : "incorrect"}`}>
                    <img className="guess-skill-img" src={`/img/sin-affinity/affinity_${guess.skills[1].sinAffinity}_big.webp`} alt="affinity icon" />
                </div>
                <div className={`guess-skill ${correctGuess.skills[2].sinAffinity === guess.skills[2].sinAffinity ? "correct" : "incorrect"}`}>
                    <img className="guess-skill-img" src={`/img/sin-affinity/affinity_${guess.skills[2].sinAffinity}_big.webp`} alt="affinity icon" />
                </div>
                
                <div className="guess-skill">
                    Attack type
                </div>
                <div className={`guess-skill ${correctGuess.skills[0].attackType === guess.skills[0].attackType ? "correct" : "incorrect"}`}>
                    <img className="guess-skill-img" src={`/img/attack/attackt_${guess.skills[0].attackType}.webp`} alt="attack icon" />
                </div>
                <div className={`guess-skill ${correctGuess.skills[1].attackType === guess.skills[1].attackType ? "correct" : "incorrect"}`}>
                    <img className="guess-skill-img" src={`/img/attack/attackt_${guess.skills[1].attackType}.webp`} alt="attack icon" />
                </div>
                <div className={`guess-skill ${correctGuess.skills[2].attackType === guess.skills[2].attackType ? "correct" : "incorrect"}`}>
                    <img className="guess-skill-img" src={`/img/attack/attackt_${guess.skills[2].attackType}.webp`} alt="attack icon" />
                </div>
                
                <div className="guess-skill">Coin count</div>
                <div className={`guess-skill ${correctGuess.skills[0].skillCoinCount===guess.skills[0].skillCoinCount?"correct":"incorrect"}`}>{guess.skills[0].skillCoinCount}</div>
                <div className={`guess-skill ${correctGuess.skills[1].skillCoinCount===guess.skills[1].skillCoinCount?"correct":"incorrect"}`}>{guess.skills[1].skillCoinCount}</div>
                <div className={`guess-skill ${correctGuess.skills[2].skillCoinCount===guess.skills[2].skillCoinCount?"correct":"incorrect"}`}>{guess.skills[2].skillCoinCount}</div>
            </div>
            <div className={`guess ${correctGuess.sinner===guess.sinner?"correct":"incorrect"}`}>
                <img className={`guess-img`} src={"/img/sinner-icon/"+guess.sinner.replace(" ","_")+"_Icon.png"} alt={"sinner icon"} />
            </div>
        </>)}

      
    </div>
}

export default GameGuesses