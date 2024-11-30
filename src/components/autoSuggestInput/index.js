import { useEffect, useRef, useState } from "react"
import "./autoSuggestInput.css"

const AutoSuggestInput = ({availableSuggestions,submitCb})=>{
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
            .filter(suggesstions=>suggesstions.name.toLowerCase().match(currSuggestion.toLowerCase())))
    },[currSuggestion,availableSuggestions])

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

    useEffect(()=>{
        setCurrChoice(0)
        if(currSuggestion) setIsActive(true)
    },[currSuggestion])

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
            if(e.key==="Enter"){
                e.preventDefault()
                if(suggesstions.length>0){
                    submitCb(suggesstions[currChoice])
                    setCurrSuggestion("")
                    setIsActive(false)
                }
            }
        }}
        autoComplete="off"/>
        {isActive?
            <div className="suggestion-container" ref={suggestionContainerRef}>
                {suggesstions
                    .map((suggesstion,i)=><div className={`suggestion ${i===currChoice?"active":""}`} key={i}
                        onClick={()=>{
                            if(suggesstions.length>0){
                                submitCb(suggesstion)
                                setCurrSuggestion("")
                                setIsActive(false)
                            }
                        }}
                        >
                        <img className="suggestion-img" src={suggesstion.icon} alt={suggesstion.name+" icon"} />
                        <p>{suggesstion.name}</p>
                    </div>)}
            </div>
        :<></>}
    </div>
}

export default AutoSuggestInput