import React, {useEffect} from 'react'
import {Canvas, useThree} from '@react-three/fiber'
import { DirectionalLight, Scene } from 'three'
import { OrbitControls, useGLTF, useTexture, useAnimations } from '@react-three/drei';
import { color, If, normalMap } from 'three/tsl';
import * as Three from 'three';


function Dog() {

    const model = useGLTF("./models/dog.drc.glb")
    useThree(({camera, scene, gl})=>(
        camera.position.z=0.4,
        gl.toneMapping = Three.ReinhardToneMapping,
        gl.outputColorSpace=Three.SRGBColorSpace
    ))

    const {actions} = useAnimations(model.animations,model.scene)
    
    useEffect(()=>{
        actions["Take 001"].play()
    },[actions])

    /* const textures=useTexture({
        normalMap:"/dog_normals.jpg",
        sampleMapCap:"/matcap/mat-2.png"
    },(texture)=>{
        texture.flipY=false,
        texture.colorSpace=Three.SRGBColorSpace
    })
     textures.flipY=false,
    textures.colorSpace=Three.SRGBColorSpace    
    */

    const [
        normalMap,
        sampleMapCap
    ]= (useTexture(["/dog_normals.jpg","/matcap/mat-2.png"])).map(
        texture=>{
        texture.flipY=false,
        texture.colorSpace=Three.SRGBColorSpace
        return texture
    }
    )

    const dogMaterial=new Three.MeshMatcapMaterial({
        normalMap: normalMap,
        matcap: sampleMapCap
    })

    model.scene.traverse((child)=>{
        if(child.name.includes("DOG")) {
           child.material=dogMaterial
        }
    })
  return (
        <>
        <primitive object={model.scene} position={[0.2,-0.6,0]} rotation={[0,Math.PI/5, 0]}/>
        <directionalLight color={0xFFFFFF} intensity={10} position={[0,0,5]}/>
        <OrbitControls />
        </>
  )
}

export default Dog