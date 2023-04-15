import React,{useContext} from 'react'
import { NavLink } from 'react-router-dom'
import emtyflipkart from '../img/emptyFlipkart.jpg'
import { Logincontext } from '../context/LoginContext'


function FlipkartCart() {
  const {logindetails} = useContext(Logincontext)
  return (
    <>

    <div className='emptyCart'>
        <div className='img-cart-holder'>
            <img style={{
              maxWidth:'100%',
              objectFit:'cover'
            }} src={emtyflipkart} alt=''/>
        </div>
        <div className='emptyItemHolder'>
            <div>Missing Cart items?</div>
            <p>Login to see the items you added previously</p>
            <div>
              <NavLink className='colorbtn navlink' to={'/'} >{logindetails.isLogin?'SHOP NOW':'Login'}</NavLink>              
            </div>
        </div>
    </div>
    </>
  )
}

export default FlipkartCart