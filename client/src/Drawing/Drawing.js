import React, { useRef } from 'react'
import {useEffect, useState, useContext} from 'react'
import CanvasDraw from "react-canvas-draw";
import './Drawing.css'
import { useNavigate } from 'react-router-dom';
import {GameContext} from '../Context/GameContext';


function Drawing() {

    let route= useNavigate();

    const {randomWord, isGuessing} = useContext(GameContext)

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
      canvas2.current.loadSaveData(img,false);
     
    },)
    


    

    const handleSend = () =>{
      //send img and word to backend
      handleData()
      route('/waiting')
    }

  
    const handleData = async () =>{
      const canvasData = canvas.current.getSaveData();
      await fetch('http://localhost:5005/change', {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
         },
        // We convert the React state to JSON and send it as the POST body
        body: JSON.stringify({img: canvasData, currentWord: word})
      }).then(function(response) {
        console.log(response)
        return response.json();
      });
     // fetch('http://localhost:5005/drawing', {
    //   method: 'POST',
    //   headers: {"content-type": "application/json"},
    //   body: JSON.stringify(randomWord)

    }


    const handleGuess = () =>{
      if(playerGuess != word){
        alert('Wrong! please try again')
        setCounter(counter+1)
      }
      else{
        alert('Success!')
        //reset object in backend to srart new session
      }
        
      

    }


  return (

    <div className="general">
        {isGuessing? <h2>Lets guess...</h2> :<h2>Lets draw...</h2>}
        {isGuessing? null: <h2 className="word">{randomWord}</h2>}
        {isGuessing? null : <div className="options">
        <div className="color">
        <label>Choose color:</label>
        <input type="color" value={color} onChange={(event)=> setColor(event.target.value)}></input>
        </div>
        <button>Clear</button>
        </div>}
        {isGuessing? img == ''? <h1>Waiting for new drawing</h1> : <CanvasDraw ref={canvas2} disabled={true} width="400px" height="400px"></CanvasDraw> : <CanvasDraw ref={canvas} className="canvas" brushRadius="5" lazyRadius="0" brushColor={color} />}
        {isGuessing? <input type="text" required={true} value={playerGuess} placeholder="Enter your answer" onChange={(event)=> setPlayerGuess(event.target.value)}></input> : null}
        {isGuessing? <button onClick={handleGuess}>Send</button> :<button onClick={handleData}>Send</button>}
    </div>
  )
}

export default Drawing