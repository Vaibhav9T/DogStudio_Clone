import React from 'react'
import {Canvas, useThree} from '@react-three/fiber'
import { DirectionalLight, Scene } from 'three'
import { OrbitControls, useGLTF, useTexture } from '@react-three/drei';
import { color, If, normalMap } from 'three/tsl';
import * as Three from 'three';


function Dog() {

    const model = useGLTF("./models/dog.drc.glb")
    useThree(({camera, scene, gl})=>(
        camera.position.z=0.6
    ))

    const textures=useTexture({
        normalMap:"/dog_normals.jpg"
    })

    textures.normalMap.flipY=false

    model.scene.traverse((child)=>{
        if(child.name.includes("DOG")) {
           child.material=new Three.MeshMatcapMaterial({
            normalMap: textures.normalMap,
            
           })
        }
    })
  return (
        <>
        <primitive object={model.scene} position={[0.25,-0.6,0]} rotation={[0,Math.PI/5, 0]}/>
        <directionalLight color={0xFFFFFF} intensity={10} position={[0,0,5]}/>
        <OrbitControls />
        </>
  )
}

export default Dog