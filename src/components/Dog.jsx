import React from 'react'
import {Canvas, useThree} from '@react-three/fiber'
import { DirectionalLight, Scene } from 'three'
import { OrbitControls, useGLTF } from '@react-three/drei';

function Dog() {

    const model = useGLTF("./models/dog.drc.glb")
    useThree(({camera, scene, gl})=>(
        camera.position.z=0.7
    ))
  return (
        <>
        <primitive object={model.scene} position={[0,-0.5,0]} rotation={[0,0, 0]}/>
        <directionalLight color={0xFFFFFF} intensity={10} position={[0,0,5]}/>
        <OrbitControls />
        </>
  )
}

export default Dog