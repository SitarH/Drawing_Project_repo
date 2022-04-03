import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Welcome from '../Welcome/Welcome';
import Difficulty from '../Difficulty/Difficulty';
import Drawing from '../Drawing/Drawing';
import Waiting from '../Waiting/Waiting';
import GameProvider from '../Context/GameContext';

function Navigation() {
  return (
    <Routes>
        <Route path="/" element={<GameProvider><Welcome/></GameProvider>}></Route>
        <Route path="/difficulty" element={<GameProvider><Difficulty/></GameProvider>}></Route>
        <Route path="/drawing" element={<GameProvider><Drawing/></GameProvider>}></Route>
        <Route path="/waiting" element={<Waiting/>}></Route>
    </Routes>
  )
}

export default Navigation