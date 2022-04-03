import { useState, createContext } from "react";

export const GameContext = createContext();

export default function GameProvider(props) {

    const [randomWord, setRandomWord] = useState("");

    const [isGuessing, setIsGuessing] = useState(false)

    const CheckGuessing = (e) =>{
        if (e == "true")
            setIsGuessing(true)
        else
            setIsGuessing(false)
    }

    //tries to use random-words examples but didnt work
    const GetRandomWord = (level) =>{
        const randomWords = require('random-words');
            let word = randomWords()
            switch (level) {
                case "easy":
                    if (word.length >=3 && word.length <=4)
                        setRandomWord(word)
                   
                    else
                        GetRandomWord()
                    break;
                case "medium":
                    if (word.length == 5)
                        setRandomWord(word)
                else
                    GetRandomWord()
                    break;
                case "hard":
                    if (word.length >= 6)
                        setRandomWord(word)
                else
                    GetRandomWord()
                    
                    break;
                default:
                    break;
            }
        
    }


    return(
        <GameContext.Provider value={{randomWord,isGuessing,CheckGuessing,GetRandomWord}}>
        {props.children}
        </GameContext.Provider>

    )
}