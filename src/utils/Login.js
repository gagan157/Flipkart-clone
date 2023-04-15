function ValidateEmail(mail) 
    {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(mail.match(mailformat))
        {
            return (true)
        }
            
        return (false)
    }
    function ValidMobile(mobile){
        if(mobile.length < 10 || mobile.length > 10){
            return false
        }
        return true
    }

    function genrateRdmNum(min,max){
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    function genrateVerifyCode(handleSetVerify,setMsg,msg){
        let gernnum = "";
        for(let i=0; i<3; i++){
            gernnum += genrateRdmNum(0,9);
            let char = String.fromCharCode(genrateRdmNum(65,90));
            gernnum += char
           
        }
        handleSetVerify(gernnum);

        let id;
        if(id){
            clearTimeout(id);
        }

        id = setTimeout(()=>{
            setMsg({
                ...msg,
                msgStatus:true,msgType:'code',msg:`OTP CODE: ${gernnum}, This OTP expire in 20sec` 
            })
        },5000)

    }

    function checkValidUser(data){
        if(localStorage.getItem('UserData')){
            let UserData = JSON.parse(localStorage.getItem('UserData'))
            let filteruser = UserData.filter((user)=>{
                return (user.mobile === data || user.email === data)
            })
            return filteruser
        }
        return [];
    }

    function handleRequestCode(e,inputChange,SetLoginDetails,logindetails,setErrorStatus,setMsg,msg,setFormStep,formstep,handleSetVerify){
        e.preventDefault()
        
        if(inputChange === ''){           
            setErrorStatus(true);
            return; 
        }


        if(!isNaN(inputChange)){            
            if(!ValidMobile(inputChange)){
                setErrorStatus(true)
                return;
            }

            let foundUser =  checkValidUser(inputChange);
            // console.log(foundUser)
            if(foundUser.length === 0){
                setErrorStatus(true)
                return
            }

            genrateVerifyCode(handleSetVerify,setMsg,msg)
            SetLoginDetails({
                ...logindetails,
                mobile: inputChange
            })

            setMsg({
                ...msg,
                msgStatus:true,
                msgType:'S',
                msg:`OTP Send in ${inputChange} Sucessfully!`
            })

            
     
        }
        else if(isNaN(inputChange)){
            if(!ValidateEmail(inputChange)){
                setErrorStatus(true)
                return;
            }

            let foundUser =  checkValidUser(inputChange);
            if(foundUser.length === 0){
                setErrorStatus(true)
                return
            }
            genrateVerifyCode(handleSetVerify,setMsg,msg)
            SetLoginDetails({
                ...logindetails,
                email: inputChange
            })
            setMsg({
                ...msg,
                msgStatus:true,
                msgType:'S',
                msg:`Send Code Sucessfully! Your Email ${inputChange}`
            })
                        
        }
        setFormStep({
            ...formstep,
            step1:false,
            step2:true
        })
    }
    function handleuserVerifyCodeOnChande(e,verfyInputchange,setVerfiInputChange,setErrorStatus){
        const {name,value} = e.target
        let captval = value.toUpperCase();
        setVerfiInputChange({
            ...verfyInputchange,
            [name] : captval
        })
        if(value && name !== 'inp6'){
            let nextsib = e.target.nextElementSibling
            nextsib.focus()
        }
        else if(!value && name !== 'inp1'){
            let prevsib = e.target.previousSibling
            prevsib.focus()
        }
        setErrorStatus(false)
    }
        
    function handleVerifyLogin(e,verfyInputchange,verfyCode,inputChange,SetLoginDetails,logindetails,handleOpenModel,isModelOpen,setErrorStatus){
        let userEnterCode = Object.values(verfyInputchange).join('')
        
        if(userEnterCode === verfyCode){
            let [{name,email,address,mobile}] = checkValidUser(inputChange)
            SetLoginDetails({
                ...logindetails,
                isLogin:true,
                name,
                email,
                mobile,
                address
            });  
            localStorage.setItem('FlipKart_isLogin',JSON.stringify({...logindetails,name,
                email,
                mobile,
                address,
                isLogin:true,
                }));
            handleOpenModel({
                ...isModelOpen,
                login:false,
            })
        }
        else{
            setErrorStatus(true)
        }
    }


export {handleRequestCode, handleVerifyLogin, handleuserVerifyCodeOnChande}    