import React from 'react'
import emptygrocery from '../img/emptyGrocery.jpg'
import { NavLink } from 'react-router-dom'

function GroceryCart() {
  return (
    <div className='emptyCart'>
        <div className='img-cart-holder'>
            <img style={{
              maxWidth:'100%',
              objectFit:'cover'
            }} src={emptygrocery} alt=''/>
        </div>
        <div className='emptyItemHolder'>
            <div>Your basket is empty!</div>
            <p>Enjoy Upto 50% Savings on Grocery</p>
            <div>
              <NavLink className='colorbtn navlink' style={{backgroundColor:'#2874f0'}} >Shop Now</NavLink>              
            </div>
        </div>
    </div>
  )
}

export default GroceryCart