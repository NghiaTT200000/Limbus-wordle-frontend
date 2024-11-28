import { useEffect, useRef, useState } from "react"
import "./autoSuggestInput.css"

const AutoSuggestInput = ({availableSuggestions})=>{
    const [currSuggestion,setCurrSuggestion] = useState("")
    const [suggesstions,setSuggestions] = useState(availableSuggestions)
    const [isActive,setIsActive] = useState(false)
    const [currChoice,setCurrChoice] = useState(0)

    const suggestionContainerRef = useRef(null)
    const suggestionInputContainerRef = useRef(null)

    const increaseChoice=()=>setCurrChoice(currChoice+1>=suggesstions.length?0:currChoice+1)

    const decreaseChoice=()=>setCurrChoice(currChoice-1<0?suggesstions.length-1:currChoice-1)

    useEffect(()=>{
        setSuggestions(
            availableSuggestions
            .filter(suggesstions=>suggesstions.txt.toLowerCase().match(currSuggestion.toLowerCase())))
    },[currSuggestion])

    useEffect(()=>{
        const container = suggestionContainerRef.current
        const active = container?.querySelector(".suggestion.active")
        if(active){
            active.scrollIntoView({
                behavior:"smooth",
                block:"nearest"
            })
        }
    },[currChoice])

    useEffect(()=>{
        document.addEventListener("mousedown",(e)=>{
            if(suggestionInputContainerRef.current&&!suggestionInputContainerRef.current.contains(e.target)) setIsActive(false)
        })
    },[])

    return <div className="auto-suggest-input-container" ref={suggestionInputContainerRef}>
        <input type="text" name="guess" id="guess" value={currSuggestion} 
        onChange={(e)=>{setCurrSuggestion(e.target.value)}}
        onFocus={e=>setIsActive(true)}
        onKeyDown={(e)=>{
            if(e.key==="ArrowDown"||e.key==="Tab"){
                e.preventDefault()
                increaseChoice()
            }
            if(e.key==="ArrowUp"){
                e.preventDefault()
                decreaseChoice()
            }
        }}
        autoComplete="off"/>
        {isActive?
            <div className="suggestion-container" ref={suggestionContainerRef}>
                {suggesstions
                    .map((suggesstions,i)=><div className={`suggestion ${i===currChoice?"active":""}`} key={i}
                        onClick={()=>console.log("Hell")}>
                        <img className="suggestion-img" src={suggesstions.img} alt={suggesstions.txt+" icon"} />
                        <p>{suggesstions.txt}</p>
                    </div>)}
            </div>
        :<></>}
    </div>
}

export default AutoSuggestInput