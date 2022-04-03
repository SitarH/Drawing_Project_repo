import React from 'react'
import {useState, useContext} from 'react'
import './Welcome.css'
import { useNavigate} from 'react-router-dom';
import {GameContext} from '../Context/GameContext'

function Welcome() {

    let route= useNavigate();

    const {CheckGuessing} = useContext(GameContext)

    const handleDraw = (event) =>{
        event.preventDefault()
        route('/difficulty')
    }

    const handleGuess = (event) =>{
      CheckGuessing(event)
      route('/drawing')
  }


  return (
    <div className="general">
    <h1>DRAW<br className="hide-on-desktop"></br>&<br className="hide-on-desktop"></br>GUESS</h1>
    
    <button onClick={event=>handleDraw(event)}>Draw</button>
    <button value={true} onClick={event=>handleGuess(event.target.value)}>Guess</button>
    </div>
  )
}

export default Welcome