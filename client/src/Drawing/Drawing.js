import React, { useRef } from 'react'
import {useEffect, useState, useContext} from 'react'
import CanvasDraw from "react-canvas-draw";
import './Drawing.css'
import { useNavigate } from 'react-router-dom';
import {GameContext} from '../Context/GameContext';


function Drawing() {

    let route= useNavigate();

    const {randomWord, isGuessing, audio1, audio2} = useContext(GameContext)

    const [color, setColor] = useState()
    const [img, setImg] = useState('')
    const [word, setWord] = useState()
    const [playerGuess, setPlayerGuess] = useState()
    const [counter, setCounter] = useState(0)

    const canvas = useRef();
    const canvas2 = useRef();

    useEffect(() => {
      if(isGuessing){
      const interval = setInterval(() => {
        fetch('http://localhost:5005/drawing')
        .then(response => response.json())
        .then(data => {
          const image = data[0].img;
          const wordData = data[0].currentWord;
          setImg(image)
          setWord(wordData)
        })
        
      }, 1000);
      return () => clearInterval(interval);
    }

        
    }, [])

    useEffect(() => {
      if(canvas2.current)
      canvas2.current.loadSaveData(img,true);
     
    },)
    
  
    const handleData = async () =>{
      audio1.play();
      const canvasData = canvas.current.getSaveData();
      await fetch('http://localhost:5005/change', {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
         },
        // convert the React state to JSON and send it as the POST body
        body: JSON.stringify({img: canvasData, currentWord: randomWord})
      }).then(function(response) {
        console.log(response)
        return response.json();
      });
      route('/waiting')
    }


    const handleGuess = () =>{
      if(playerGuess != word){
        alert('Wrong! please try again')
        setCounter(counter+1)
        setPlayerGuess("")
        
      }
      else{
        audio2.play();
        alert('Success!')
        handleReset()
        setPlayerGuess("")
        route('/')

      }

    }

    const handleReset = () =>{
      fetch('http://localhost:5005/reset', {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
         },
        body: JSON.stringify({img: "", currentWord: ""})
      }).then(function(response) {
        console.log(response)
        return response.json();
      });

    }


  return (

    <div className="general">
        {isGuessing? <h2>Lets guess...</h2> :<h2>Lets draw...</h2>}
        {isGuessing? null: <h2 className="word">{randomWord}</h2>}
        {isGuessing? null : 
        <div className="color">
        <label>Choose color:</label>
        <input type="color" value={color} onChange={(event)=> setColor(event.target.value)}></input>
        </div>
        }
        {isGuessing? img == ''? <h1 className="waitingDraw">Waiting for new drawing</h1> : <CanvasDraw className="canvas" ref={canvas2} disabled={true}></CanvasDraw> : <CanvasDraw ref={canvas} className="canvas" brushRadius="5" lazyRadius="0" brushColor={color} />}
        {isGuessing? <input type="text" required={true} value={playerGuess} placeholder="Enter your answer" onChange={(event)=> setPlayerGuess(event.target.value)}></input> : null}
        {isGuessing? <button onClick={handleGuess}>Send</button> :<button onClick={handleData}>Send</button>}
    </div>
  )
}

export default Drawing