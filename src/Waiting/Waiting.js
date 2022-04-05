import React from 'react';
import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function Waiting() {

  let route= useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:5005/drawing')
      .then(response => response.json())
      .then(data => {
        const image = data[0].img;
        const wordData = data[0].currentWord;
        if (image === "" && wordData === "")
          route('/')
      })
      
    }, 1000);
    return () => clearInterval(interval);
  
  }, [])

  return (
      <div className="general">
    <h1 className="waiting">Waiting...</h1>
    </div>
  )
}

export default Waiting