import React, { useState,useContext } from 'react'
import { Logincontext } from '../context/LoginContext';
import { MessageContext } from '../context/MessageContext';
import { handleVerifyLogin, handleuserVerifyCodeOnChande, handleRequestCode } from '../utils/Login';

function UserLogin({handleOpenModel,isModelOpen,handleSetVerify,verfyCode}) {
    const [verfyInputchange,setVerfiInputChange] = useState({inp1:'',inp2:'',inp3:'',inp4:'',inp5:'',inp6:'',})
    const inputVeryNumberStyle = {
        borderBottom:'1px solid #2874f0',
        width:'25px',
        height: '30px',
        fontSize : '2rem',
        margin:'0 .8rem',
        textAlign:'center'
    }
    const [formstep,setFormStep] = useState({step1:true,step2:false})
    const [inputChange,setinputChage] = useState('');
    const [errorStatus,setErrorStatus] = useState(false);
    
    const {logindetails,SetLoginDetails} = useContext(Logincontext)
    const {msg,setMsg} = useContext(MessageContext);
    
    
        
    
  return (
    <>
        {formstep.step1?
        <>
            <form onSubmit={e=>handleRequestCode(e,inputChange,SetLoginDetails,logindetails,setErrorStatus,setMsg,msg,setFormStep,formstep,handleSetVerify)}>
                <div className='input-holder'>
                    <input 
                        id='modelinput' 
                        type={'text'} 
                        placeholder={`Enter Email/Mobile number`}
                        value={inputChange}
                        style={{borderBottom:`1px solid ${errorStatus?'red':'#e0e0e0'}` }}
                        onChange={(e)=>{
                            setinputChage(e.target.value)
                            setErrorStatus(false);
                        }}    
                        />
                    <label>Enter Email/Mobile number</label>
                </div>
                {errorStatus && <span className='error loginerror'>Please enter valid Email ID/Mobile number</span>}

                <p>By continuing, you agree to Flipkart's <span>Terms of Use</span> and <span>Privacy Policy.</span></p>
                
                <button type='submit' className='colorbtn'>Request OTP</button>               
            </form>
            <button className='linkbutton' onClick={(e)=>{
                                    e.stopPropagation();
                                    handleOpenModel({
                                        ...isModelOpen,
                                        login:false,
                                        signup:true
                                })
            }}>New to Flipkart? Create an account</button>
        </>
        :
        <div className='formStep-holder'>
            <div className=''>
                <p style={{margin:'.5rem 0', textAlign:'center', fontSize:'1rem',color:'black'}}>Please enter the OTP to</p>
                <p style={{margin:'.5rem 0', textAlign:'center', fontSize:'1rem',color:'black'}}>{logindetails.mobile?logindetails.mobile:logindetails.email} 
                    <span style={{color:'#2874f0',cursor:'pointer'}} onClick={()=>{
                        setFormStep({
                            ...formstep,
                            step1:true,
                            step2:false
                        })
                        logindetails.mobile? setinputChage(logindetails.mobile):setinputChage(logindetails.email)
                    }}> Change</span></p>
            </div>
            <div className='codeverify' style={{marginTop:'4rem'}}>
                <input type={'text'} maxLength={'1'} value={verfyInputchange.inp1} name='inp1' style={{...inputVeryNumberStyle,borderBottom:`1px solid ${errorStatus?'red':'#2874f0'}`}} onChange={(e)=>handleuserVerifyCodeOnChande(e,verfyInputchange,setVerfiInputChange,setErrorStatus)}/>
                <input type={'text'} maxLength={'1'} value={verfyInputchange.inp2} name='inp2' style={{...inputVeryNumberStyle,borderBottom:`1px solid ${errorStatus?'red':'#2874f0'}`}} onChange={(e)=>handleuserVerifyCodeOnChande(e,verfyInputchange,setVerfiInputChange,setErrorStatus)}/>
                <input type={'text'} maxLength={'1'} value={verfyInputchange.inp3} name='inp3' style={{...inputVeryNumberStyle,borderBottom:`1px solid ${errorStatus?'red':'#2874f0'}`}} onChange={(e)=>handleuserVerifyCodeOnChande(e,verfyInputchange,setVerfiInputChange,setErrorStatus)}/>
                <input type={'text'} maxLength={'1'} value={verfyInputchange.inp4} name='inp4' style={{...inputVeryNumberStyle,borderBottom:`1px solid ${errorStatus?'red':'#2874f0'}`}} onChange={(e)=>handleuserVerifyCodeOnChande(e,verfyInputchange,setVerfiInputChange,setErrorStatus)}/>
                <input type={'text'} maxLength={'1'} value={verfyInputchange.inp5} name='inp5' style={{...inputVeryNumberStyle,borderBottom:`1px solid ${errorStatus?'red':'#2874f0'}`}} onChange={(e)=>handleuserVerifyCodeOnChande(e,verfyInputchange,setVerfiInputChange,setErrorStatus)}/>
                <input type={'text'} maxLength={'1'} value={verfyInputchange.inp6} name='inp6' style={{...inputVeryNumberStyle,borderBottom:`1px solid ${errorStatus?'red':'#2874f0'}`}} onChange={(e)=>handleuserVerifyCodeOnChande(e,verfyInputchange,setVerfiInputChange,setErrorStatus)}/><br />
                {errorStatus && <div className='verfy-error' style={{textAlign:'center',marginTop:'.5rem'}}>Please Enter Valid Code.</div>}
            </div>
            <button type='button' className='colorbtn' style={{marginTop:'3rem',backgroundColor:'#2874f0'}} onClick={e=>handleVerifyLogin(e,verfyInputchange,verfyCode,inputChange,SetLoginDetails,logindetails,handleOpenModel,isModelOpen,setErrorStatus)}>Verify</button>
            <div style={{textAlign:'center',marginTop:'1rem'}}>
                    Not received your code? <button onClick={e=>handleRequestCode(e,inputChange,SetLoginDetails,logindetails,setErrorStatus,setMsg,msg,setFormStep,formstep,handleSetVerify)} type='button' style={{
                        backgroundColor:'transparent',
                        color:'#2874f0',
                        border:'none',
                        cursor:'pointer'
                    }} >Resend Code</button>  
            </div>
        </div>
        
        }

    </>
  )
}

export default UserLogin