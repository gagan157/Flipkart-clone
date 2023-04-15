import React, { useState, useContext } from 'react'
import { MessageContext } from '../context/MessageContext'
// var bcrypt = require('bcryptjs');
import bcrypt from "bcryptjs-react"
import craeteUserUsingFirebase from '../Firebase/AuthFirebase/UserSignUpFirebase'

function UserSignUp({handleOpenModel,isModelOpen}) {
    const [errorStatus,setErrorStatus] = useState(false)
    const [inputSignupChange,setInputSignChange] = useState('')
    const [formsignupstep,setSignUpForm] = useState({step1:true,step2:false})
    const [signupdetails,setSignUpDetails] = useState({name:'',email:'',address:'',password:'',mobile:''})
    const [showError,setShowError] = useState({name:{status:false,msg:''},email:{status:false,msg:''},password:{status:false,msg:''}})

    const {msg,setMsg} = useContext(MessageContext);

    

    function handleSignuponchange(e){
        const {name,value} = e.target;
        setSignUpDetails({
            ...signupdetails,
            [name] : value
        })
        setShowError({
            ...showError,
            [name] : {...showError[name],status:false,msg:''}
        })
    }

    function validMobile(mob){
        if(isNaN(mob) || (mob.length < 10 || mob.length > 10) ){
            return false;
        }
        return true;
    }

    function handleContinue(e){
        e.preventDefault()
        if(inputSignupChange === '' || !validMobile(inputSignupChange)){
            setErrorStatus(true);
            return
        }
        if(localStorage.getItem('UserData') ){
            let userdata = JSON.parse(localStorage.getItem('UserData')).filter((user)=>{
                return user.mobile === inputSignupChange
            })
            if(userdata.length !== 0){
                setErrorStatus(true);
                return;
            }
        }
        setSignUpDetails({
            ...signupdetails,
            mobile:inputSignupChange
        })
        setSignUpForm({
            ...formsignupstep,
            step1:false,
            step2:true
        })

        
    }
    function validEmail(mail){
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(mail.match(mailformat))
        {
            return (true)
        }
            
        return (false)
    }
    function validFormdata(userDetails){
        const errordata = {}
        const {name,email,password,address} = userDetails;
        if(name.length < 3){
            errordata.nameerror = 'The minimum length for this field is 3 characters'
        }

        if(email === '' || !validEmail(email)){
            errordata.emailerror = 'Please Enter Valid Email'    
        }

        if(password.length < 5){
            errordata.passworderror = 'The minimum length for this field is 5 characters'    
        }
        
        return errordata;

    }

    function handleSignup(e){
        e.preventDefault()
        const errordata = validFormdata(signupdetails)
        // console.log(errordata)
        if(Object.keys(errordata).length === 0){
            let pass = signupdetails.password
            let salt = bcrypt.genSaltSync(10)
            let secpasshash = bcrypt.hashSync(pass,salt)
            //data save

            const userArr = [{...signupdetails,password:secpasshash}]
            if(localStorage.getItem('UserData')){
                let userdata = JSON.parse(localStorage.getItem('UserData'))

                let newUserData = [...userdata,...userArr];

                localStorage.setItem('UserData',JSON.stringify(newUserData))

                
            }
            else{
                
                localStorage.setItem('UserData',JSON.stringify(userArr))
            }
            craeteUserUsingFirebase({...signupdetails,password:secpasshash})

            handleOpenModel({
                ...isModelOpen,
                login:true,
                signup:false
            })

            setMsg({
                ...msg,
                msgStatus:true,
                msgType:'S',
                msg:'SignUp successfully!'
            })

        }
        else{
            //eerro handle
            const {nameerror,emailerror,passworderror} = errordata;
            
           
            setShowError({
                ...showError,
                name : {...showError.name, status: nameerror?true:false,msg: nameerror?nameerror:''},
                email : {...showError.email, status: emailerror?true:false,msg: emailerror?emailerror:''},
                password : {...showError.password, status: passworderror?true:false,msg: passworderror?passworderror:''},
            })
            
           

            
        }
    }
  return (
    <>
    {formsignupstep.step1?
    <form onSubmit={handleContinue}>
        <div className='input-holder'>
            <input 
                id='modelinput' type={'text'} 
                placeholder={`Enter Mobile number`}
                style={{borderBottom:`1px solid ${errorStatus?'red':'#e0e0e0'}`}}
                value={inputSignupChange}
                onChange={(e)=>{
                    setInputSignChange(e.target.value);
                    setErrorStatus(false);
                }}
            />
            <label>Enter Mobile number</label>
        </div>
        {errorStatus && <span className='error signuperror'>Please enter a valid Mobile number</span>}
        <p>By continuing, you agree to Flipkart's <span>Terms of Use</span> and <span>Privacy Policy.</span></p>
    
        <button type='submit' className='colorbtn'>CONTINUE</button>
        <button className='existbutton' onClick={(e)=>{
            e.stopPropagation();
            handleOpenModel({
                ...isModelOpen,
                login:true,
                signup:false
            })
        }}>Existing User? Log in</button> 
    </form> 
    :
    formsignupstep.step2?
    <form id='signupform-Step2' onSubmit={handleSignup}>
        <div className='inp-holder'>
            <input type={'text'} value={signupdetails.name} name='name' placeholder='Name' onChange={handleSignuponchange}/>
            <label>Name</label>
            {showError.name.status && <span className='error-name step2Fromerror'>{showError.name.msg}</span>}
        </div>
        <div className='inp-holder'>
            <input required type={'email'} value={signupdetails.email} name='email' placeholder='Email' onChange={handleSignuponchange}/>
            <label>Email <span style={{color:'red'}}>*</span></label>
            {showError.email.status && <span className='error-email step2Fromerror'>{showError.email.msg}</span>}
        </div>
        <div className='inp-holder'>
            <input required type={'password'} value={signupdetails.password} name='password' placeholder='Password' onChange={handleSignuponchange}/>
            <label>Password <span style={{color:'red'}}>*</span></label>
            {showError.password.status && <span className='error-password step2Fromerror'>{showError.password.msg}</span>}
        </div>
        <div className='inp-holder'>
            <input type={'text'} value={signupdetails.address} name='address' placeholder='Address' onChange={handleSignuponchange}/>
            <label>Address</label>
            <span className='error-address step2Fromerror'></span>
        </div>
        <button className='colorbtn'>Signup</button>
    </form>
    :null 
    }
    </>
  )
}

export default UserSignUp