import React, { memo } from 'react'
import SubNavbar from './SubNavbar'
import Slider from './Slider'
// import ProductState from '../context/ProductState'
import Products from './Products'



function Home() {
  return (
    <>
        <SubNavbar />
        <div className='mainbody'>
            <Slider />           
            <Products />           
        </div>
             
    </>
  )
}

export default memo(Home)