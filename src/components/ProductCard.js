import React from 'react'

function ProductCard({product}) {
  
  return (
    <>
    <div className='prdcard-img-holder'>
        <img src={product.images[0]} alt=''/>
    </div>
    <div className='prdcard-detail-holder'>
        <div>{product.title}</div>
        <div>&#8377;{product.price}</div>
    </div>
    </>
  )
}

export default ProductCard