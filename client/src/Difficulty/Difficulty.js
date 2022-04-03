import React from 'react'
import {useEffect, useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import {GameContext} from '../Context/GameContext'

function Difficulty() {

    let route= useNavigate();

    const {GetRandomWord, CheckGuessing} = useContext(GameContext)

    const [level, setLevel] = useState("")

        useEffect(() => {
            if (level != "")
                HandleLevel(level)

        }, [level])

        const HandleLevel = (level) =>{
            GetRandomWord(level)
            CheckGuessing(false)
            route('/drawing')
        }
        


  return (
      <div className="general difficulty">
    <h1>CHOOSE DIFFICULTY</h1>
    <button value="easy" onClick={(event)=>setLevel(event.target.value)}>Easy</button>
    <button  value="medium" onClick={(event)=>setLevel(event.target.value)}>Medium</button>
    <button  value="hard" onClick={(event)=>setLevel(event.target.value)}>Hard</button>
    </div>
  )
}

export default Difficulty