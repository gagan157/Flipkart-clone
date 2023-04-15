import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleRight , faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import slid1 from '../img/slid1.jpg'
import slid2 from '../img/slid2.jpg'
import slid3 from '../img/slid3.jpg'
import slid4 from '../img/slid4.jpg'
import ban1 from '../img/ban1.jpg'


const imgData = [slid1,slid2,slid3,slid4,slid1];

function Slider() {
    const [scrollleft,setScrollLeft] = useState(0)

    let slideref = useRef()
    
    function handlemoveforward(e){
        
        slideref.current.style.scrollBehavior = 'smooth'
        let clientwidth = slideref.current.clientWidth

        
        slideref.current.scrollLeft =  scrollleft

        setScrollLeft(scrollleft + clientwidth)

        let size = clientwidth * (imgData.length-1)
       
        if(scrollleft === size){
            let x;
            if(x){
                clearTimeout(x);
            }

            x = setTimeout(()=>{
                slideref.current.style.scrollBehavior = 'unset'
                slideref.current.scrollLeft =  0
                setScrollLeft(clientwidth);
            },500)
                       
        }
    }
    function handlemovebackward(e){
        slideref.current.style.scrollBehavior = 'smooth'
        let clientwidth = slideref.current.clientWidth
        slideref.current.scrollLeft = scrollleft
        setScrollLeft(scrollleft - clientwidth)
        let size = clientwidth * (imgData.length-1)
    
        
        if(scrollleft === '0'){
            slideref.current.style.scrollBehavior = 'unset'
            slideref.current.scrollLeft = size;
            setScrollLeft(size)
        }
    }

    useEffect(()=>{
        let clientwidth = slideref.current.clientWidth       
        setScrollLeft(scrollleft + clientwidth)
    },[])
    

    
    useEffect(()=>{
        let x = setInterval(()=>{    
            slideref.current.style.scrollBehavior = 'smooth'
        let clientwidth = slideref.current.clientWidth

        
        slideref.current.scrollLeft =  scrollleft

        setScrollLeft(scrollleft + clientwidth)

        let size = clientwidth * (imgData.length-1)
       
        if(scrollleft === size){       
            let y = '';
            if(y){
                clearTimeout(y);
            }   
           y = setTimeout(()=>{
                slideref.current.style.scrollBehavior = 'unset'
                slideref.current.scrollLeft =  0
                setScrollLeft(clientwidth);
            },1000)
            return ()=>clearTimeout(y)
        }
        },4000)

        return ()=>{
            clearInterval(x);
        }
    },[scrollleft])
  return (
    <>
        <div className='slidwrap'>
            {/* <div className='slide-arrow slide-left-arrow' onClick={handlemovebackward}>
                <FontAwesomeIcon icon={faAngleLeft}/>
            </div>             */}
            <div ref={slideref} className='slidwrap_holder'>
                {/* <img src={img} alt=''/> */}
                {imgData.map((img,idx)=>{
                    return <img key={'img'+idx} src={img}  alt=''/>
                })} 
            </div>
            {/* <div className='slide-arrow slide-right-arrow' onClick={handlemoveforward}>
                <FontAwesomeIcon icon={faAngleRight}/>
            </div> */}
        </div>
        <div className='ban1'>
            <img src={ban1} alt=''/>
          
        </div>
    </>
  )
}

export default Slider