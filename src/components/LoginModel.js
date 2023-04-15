import React, { useEffect } from 'react'
import Model from './Model'

function LoginModel({handleOpenModel,isModelOpen}) {

  useEffect(()=>{
    handleOpenModel({
      ...isModelOpen,
      login:true
    })
  },[])
  return (
    <>
    <Model handleOpenModel={handleOpenModel} isModelOpen={isModelOpen}/>
    </>
  )
}

export default LoginModel