import React from 'react'
import nopagefound from '../img/No-page.png'
import { useNavigate } from 'react-router'

function NoPageFound() {
  const navigate = useNavigate()
  return (
    <div className='noPageFound'>
        <div className='noPageFound-img'>
          <img src={nopagefound} alt=''/>
        </div>
        <div>Unfortunately the page you are looking for has been moved or deleted</div>
        <button onClick={(e)=>navigate('/')}>GO TO HOMEPAGE</button>
    </div>
  )
}

export default NoPageFound