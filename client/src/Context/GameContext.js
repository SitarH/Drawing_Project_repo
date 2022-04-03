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
            // if(levelState === ""){
            //     setLevelState(level)
            // }
            // const currentLevel = levelState.find(item=> item === level)
            // RndFunc(currentLevel)
    }

    // const RndFunc = (currentLevel) =>{
    //     debugger
    //     const randomWords = require('random-words');
    //     let word = randomWords();
    //     switch (currentLevel) {
    //         case "easy":
    //             if (word.length >=3 && word.length <=4)
    //                 setRandomWord(word);
    //             else
    //             RndFunc();
    //             break;
    //         case "medium":
    //             if (word.length == 5)
    //                 setRandomWord(word);
    //             else
    //             RndFunc();
    //             break;
    //         case "hard":
    //             if (word.length >= 6)
    //                 setRandomWord(word);
    //             else
    //             RndFunc();
    //             break;
    //         default:
    //             break;
    //     }

    // }


    return(
        <GameContext.Provider value={{randomWord,isGuessing,audio1, audio2, CheckGuessing,GetRandomWord}}>
        {props.children}
        </GameContext.Provider>

    )
}