import React from 'react'
import { Navigate } from 'react-router'

function RouteAfterLogin({component}) {
    let isLogin = localStorage.getItem('FlipKart_isLogin');
  return (
     <>     
        {isLogin?component:<Navigate to={'/'}/>}
     </>
  )
}

export default RouteAfterLogin