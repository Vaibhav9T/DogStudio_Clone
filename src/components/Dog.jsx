import React, {useEffect} from 'react'
import {Canvas, useThree} from '@react-three/fiber'
import { DirectionalLight, Scene } from 'three'
import { OrbitControls, useGLTF, useTexture, useAnimations } from '@react-three/drei';
import { color, If, normalMap, texture } from 'three/tsl';
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
        normalMap
    ]= (useTexture(["/dog_normals.jpg"])).map(
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

        const [
        mat1,
        mat2,
        mat3,
        mat4,
        mat5,
        mat6,
        mat7,
        mat8,
        mat9,
        mat10,
        mat11,
        mat12,
        mat13,
        mat14,
        mat15,
        mat16,
        mat17,
        mat18,
        mat19,
        mat20
        ] = (useTexture([
            "/matcap/mat-1.png",
            "/matcap/mat-2.png",
            "/matcap/mat-3.png",
            "/matcap/mat-4.png",
            "/matcap/mat-5.png",
            "/matcap/mat-6.png",
            "/matcap/mat-7.png",
            "/matcap/mat-8.png",
            "/matcap/mat-9.png",
            "/matcap/mat-10.png",
            "/matcap/mat-11.png",
            "/matcap/mat-12.png",
            "/matcap/mat-13.png",
            "/matcap/mat-14.png",
            "/matcap/mat-15.png",
            "/matcap/mat-16.png",
            "/matcap/mat-17.png",
            "/matcap/mat-18.png",
            "/matcap/mat-19.png",
            "/matcap/mat-20.png"
        ]).map(texture=>{
            texture.colorSpace = Three.SRGBColorSpace
            return texture
        }))

        const material = useRef({
            uMatcap1:{value:mat19},
            uMatcap2:{value:mat2},
            uProgress:{value:1.0}
        })

    const dogMaterial=new Three.MeshMatcapMaterial({
        normalMap: normalMap,
        matcap: mat2
    })

    const branchMaterial=new Three.MeshMatcapMaterial({
        normalMap: branchNormalMap,
        map: branchMap
    })

    
    function onBeforeCompile(shader) {
        shader.uniforms.uMatcapTexture1 = material.current.uMatcap1
        shader.uniforms.uMatcapTexture2 = material.current.uMatcap2
        shader.uniforms.uProgress = material.current.uProgress

        // Store reference to shader uniforms for GSAP animation

        shader.fragmentShader = shader.fragmentShader.replace(
            "void main() {",
            `
        uniform sampler2D uMatcapTexture1;
        uniform sampler2D uMatcapTexture2;
        uniform float uProgress;

        void main() {
        `
        )

        shader.fragmentShader = shader.fragmentShader.replace(
            "vec4 matcapColor = texture2D( matcap, uv );",
            `
          vec4 matcapColor1 = texture2D( uMatcapTexture1, uv );
          vec4 matcapColor2 = texture2D( uMatcapTexture2, uv );
          float transitionFactor  = 0.2;
          
          float progress = smoothstep(uProgress - transitionFactor,uProgress, (vViewPosition.x+vViewPosition.y)*0.5 + 0.5);

          vec4 matcapColor = mix(matcapColor2, matcapColor1, progress );
        `
        )
    }

    dogMaterial.onBeforeCompile=onBeforeCompile

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
                markers: false,
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

    useEffect(()=>{
        document.querySelector(`.title[itl="tommorowland"]`).addEventListener("mouseenter",()=>{
             material.current.uMatcap1.value=mat19
            gsap.to(material.current.uProgress,{
                value:0.0,
                duration: 1,
                onComplete:()=>{
                    material.current.uMatcap2.value=material.current.uMatcap1.value,
                    material.current.uProgress.value=1.0
                }
            })
        })

        document.querySelector(`.title[itl="navy"]`).addEventListener("mouseenter",()=>{
            material.current.uMatcap1.value=mat8
            gsap.to(material.current.uProgress,{
                value:0.0,
                duration: 1,
                onComplete:()=>{
                    material.current.uMatcap2.value=material.current.uMatcap1.value,
                    material.current.uProgress.value=1.0
                }
            })
        })

         document.querySelector(`.title[itl="msi"]`).addEventListener("mouseenter",()=>{
            material.current.uMatcap1.value=mat9
            gsap.to(material.current.uProgress,{
                value:0.0,
                duration: 1,
                onComplete:()=>{
                    material.current.uMatcap2.value=material.current.uMatcap1.value,
                    material.current.uProgress.value=1.0
                }
            })
        })

        document.querySelector(`.title[itl="phone"]`).addEventListener("mouseenter",()=>{
            material.current.uMatcap1.value=mat12
            gsap.to(material.current.uProgress,{
                value:0.0,
                duration: 1,
                onComplete:()=>{
                    material.current.uMatcap2.value=material.current.uMatcap1.value,
                    material.current.uProgress.value=1.0
                }
            })
        })

        document.querySelector(`.title[itl="kikk"]`).addEventListener("mouseenter",()=>{
            material.current.uMatcap1.value=mat10
            gsap.to(material.current.uProgress,{
                value:0.0,
                duration: 1,
                onComplete:()=>{
                    material.current.uMatcap2.value=material.current.uMatcap1.value,
                    material.current.uProgress.value=1.0
                }
            })
        })

        document.querySelector(`.title[itl="kennedy"]`).addEventListener("mouseenter",()=>{
            material.current.uMatcap1.value=mat8
            gsap.to(material.current.uProgress,{
                value:0.0,
                duration: 1,
                onComplete:()=>{
                    material.current.uMatcap2.value=material.current.uMatcap1.value,
                    material.current.uProgress.value=1.0
                }
            })
        })

        document.querySelector(`.title[itl="opera"]`).addEventListener("mouseenter",()=>{
            material.current.uMatcap1.value=mat13
            gsap.to(material.current.uProgress,{
                value:0.0,
                duration: 1,
                onComplete:()=>{
                    material.current.uMatcap2.value=material.current.uMatcap1.value,
                    material.current.uProgress.value=1.0
                }
            })
        })

        document.querySelector(`#sec-2`).addEventListener("mouseleave",()=>{
            material.current.uMatcap1.value=mat2
            gsap.to(material.current.uProgress,{
                value:0.0,
                duration: 1,
                onComplete:()=>{
                    material.current.uMatcap2.value=material.current.uMatcap1.value,
                    material.current.uProgress.value=1.0
                }
            })
        })
    },[])

    
  return (
        <>
        <primitive object={model.scene} position={[0.18,-0.63,0]} rotation={[0,Math.PI/5, 0]}/>
        <directionalLight color={0xFFFFFF} intensity={10} position={[0,0,5]}/>
        </>
  )
}

export default Dog