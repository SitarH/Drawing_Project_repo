import { useState, createContext, useEffect } from "react";
import clickSound from '../Audio/clickSound.wav';
import finish from '../Audio/finish.wav';


export const GameContext = createContext();

export default function GameProvider(props) {

    const [randomWord, setRandomWord] = useState("");

    const [isGuessing, setIsGuessing] = useState(false);

    const [audio1] = useState(new Audio(clickSound));
    const [audio2] = useState(new Audio(finish));
    

    const CheckGuessing = (e) =>{
        if (e == "true")
            setIsGuessing(true)
        else
            setIsGuessing(false)
    }


    const GetRandomWord = (level) =>{
        const randomWords = require('random-words');
        let word;
        switch (level) {
            case "easy":
                 word = randomWords({exactly: 1, minLenght: 3, maxLength: 4});
                break;
            case "medium":
                 word = randomWords({exactly: 1, exactlyLenght: 5});
                break;
            case "hard":
                word = randomWords({exactly: 1, minLenght: 6, maxLength: 10});
                break;
            default:
                break;
        }
        setRandomWord(word);
    }



    return(
        <GameContext.Provider value={{randomWord,isGuessing,audio1, audio2, CheckGuessing,GetRandomWord}}>
        {props.children}
        </GameContext.Provider>

    )
}