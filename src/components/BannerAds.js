import React from 'react'



function BannerAds({banlist}) {
  return (
    <div className='banneradsList'>
       {banlist.map((src,idx)=>{
            return <div style={{cursor:'pointer'}} key={'src'+idx} className='bannerads-holder'>
                <img src={src} alt=''/> 
            </div>
       })}      
    </div>
  )
}

export default BannerAds