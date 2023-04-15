import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect,useState,useContext } from 'react'
import loginback from '../img/loginbackgoud.png'
import UserLogin from './UserLogin'
import UserSignUp from './UserSignUp'
import { MessageContext } from '../context/MessageContext'

function Model({handleOpenModel,isModelOpen}) {
  const  {verfyCode,SetVerfiyCode, msg, setMsg} = useContext(MessageContext)
  const modelWrapperStyle ={
    position : 'absolute',
    width : '100%',
    height : '100vh',
    top : '0',
    bottom : '0',
    left : '0',
    right : '0',
    backgroundColor : 'rgb(0,0,0,.5)',
    zIndex : 60
  }
  const modelStyle ={
    position : 'absolute',
    width : '45%',
    height : '70%',
    top : '0',
    bottom : '0',
    left : '0',
    right : '0',
    margin : 'auto',
    backgroundColor : '#2874f0',
    borderRadius: '2px',
  }  

  function handleSetVerify(code){
    SetVerfiyCode(code)
  }


  function handleclosemodel(e){
        handleOpenModel({
            ...isModelOpen,
            login:false,
            signup:false
        })
    
  }

  useEffect(()=>{
    if(isModelOpen.login || isModelOpen.signup){
        let input = document.getElementById('modelinput')
        if(input){
          input.focus();
        }
    }
    return ()=>{
        document.getElementById('modelinput');
    }
  },[isModelOpen])
  return (
    <div className='wrraper-model' id='wrpmodel' style={{...modelWrapperStyle}}>
      {/* <span style={{
        position:'absolute',
        width:'fit-content',
        padding:'.5rem 1rem',
        top:`${verfyCode.status?'70px':'120px'}`,
        opacity:`${verfyCode.status?'1':'0'}`,
        visibility:`${verfyCode.status?'1':'0'}`,
        left:'0',
        right:'0',
        margin:'auto',
        color:'white',
        textAlign:'center',
        borderRadius:'3px',
        backgroundColor:'#2874f0',
        transition :'top 1s',
        transitionDelay:'3s'

      }}>Code: {verfyCode.code}</span> */}
        <div className='model' style={{...modelStyle}}>
            <div className='model-box'>
                <FontAwesomeIcon onClick={handleclosemodel} size='lg' className='model-box-cross' icon={faXmark}/>
                <div className='model-box-content'>
                   {isModelOpen.login?
                   <div>
                        <h2>Login</h2>
                        <p>Get access to your Orders, Wishlist and Recommendations</p>
                    </div> : 
                    isModelOpen.signup? 
                    <div>
                        <h2>Looks like you're new here!</h2>
                        <p>Sign up with your mobile number to get started</p>
                    </div>
                    : null}
                    <img src={loginback} alt=''/>
                </div>
                <div className='model-box-form'>
                    {isModelOpen.login?
                        <UserLogin handleOpenModel={handleOpenModel} isModelOpen={isModelOpen} handleSetVerify={handleSetVerify} verfyCode={verfyCode}/>
                        :
                        isModelOpen.signup?
                        <UserSignUp handleOpenModel={handleOpenModel} isModelOpen={isModelOpen}/>
                        :
                        null
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Model