import React from 'react'
import  './Projects.css'


function Projects({ className, year, pTitle, ...props}) {

  return (
    <div className='titles'>
    <div className={`title ${className || ''}`} {...props}>
        <div className='year'>
        <small>{year}</small>
        </div>
        <div className='p'>
        <h1>{pTitle}</h1>
        </div>
    </div>
    </div>
  )
}

export default Projects