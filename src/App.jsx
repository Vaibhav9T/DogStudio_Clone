import './App.css'

import React from 'react'
import Dog from './components/Dog'
import { Canvas  } from "@react-three/fiber";
import { cover } from 'three/src/extras/TextureUtils.js';

function App() {
  return (
    <main>
    <Canvas style={{
        height:"100vh",
        width:"100vw",
        position:'fixed',
        top:0,
        left:0,
         zIndex:1,
         backgroundImage:"url(/background-l.png)",
         backgroundRepeat:'no-repeat',
         backgroundSize:"cover"
    }}> 
        <Dog />
    </Canvas>

    <section id='sec-1'></section>
    <section id='sec-2'></section>
    <section id='sec-3'></section>
    </main>
   
  )
}

export default App