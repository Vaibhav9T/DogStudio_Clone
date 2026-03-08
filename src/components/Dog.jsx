import React, {useEffect} from 'react'
import {Canvas, useThree} from '@react-three/fiber'
import { DirectionalLight, Scene } from 'three'
import { OrbitControls, useGLTF, useTexture, useAnimations } from '@react-three/drei';
import { color, If, normalMap } from 'three/tsl';
import * as Three from 'three';
import gsap  from 'gsap';
import{useGSAP} from '@gsap/react'
import { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function Dog() {

    gsap.registerPlugin(ScrollTrigger)
    gsap.registerPlugin(useGSAP)

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

    const [branchMap, 
        branchNormalMap]=(
            useTexture(["/branches_diffuse.jpeg","/branches_normals.jpeg"]).map(texture=>{
                texture.colorSpace=Three.SRGBColorSpace
                return texture
            })
        )

    const dogMaterial=new Three.MeshMatcapMaterial({
        normalMap: normalMap,
        matcap: sampleMapCap
    })

    const branchMaterial=new Three.MeshMatcapMaterial({
        normalMap: branchNormalMap,
        map: branchMap
    })

    model.scene.traverse((child)=>{
        if(child.name.includes("DOG")) {
           child.material=dogMaterial
        }else{
            child.material=branchMaterial
        }
    })

    const dogmodel = useRef(model);

    useGSAP(()=>{
        const tl=gsap.timeline({
            scrollTrigger:{
                trigger: "#sec-1",
                endTrigger:"#sec-3",
                start:"top top",
                end:"bottom bottom",
                markers: true,
                scrub:true
            }
        })
        tl
        .to(dogmodel.current.scene.position,{
            z:"-=0.75",
           y:"+=0.1"
        })
        .to(dogmodel.current.scene.rotation, {
            x:`+=${Math.PI / 15}`
        })
        .to(dogmodel.current.scene.rotation,{
            y:`-=${Math.PI}`,
            x:`+=${Math.PI / 15}`
        },'third')
        .to(dogmodel.current.scene.position,{
            x:"-=0.5",
            z: "+=0.3",
            y:"+=0.1"
        }, 'third')
    },[])

    
  return (
        <>
        <primitive object={model.scene} position={[0.19,-0.61,0]} rotation={[0,Math.PI/5, 0]}/>
        <directionalLight color={0xFFFFFF} intensity={10} position={[0,0,5]}/>
        </>
  )
}

export default Dog