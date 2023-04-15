import React ,{ createContext, useEffect, useState } from "react";


const Logincontext = createContext({})

function LoginState({children}){
    const [logindetails,SetLoginDetails] = useState({name:'',mobile:'',email:'',address:'',isLogin:false});
    


    useEffect(()=>{
        if(localStorage.getItem('FlipKart_isLogin')){
            let data = JSON.parse(localStorage.getItem('FlipKart_isLogin'))
            SetLoginDetails({
                ...logindetails,
                ...data
            })
        }
    },[])

   
 
    return(
        <Logincontext.Provider value={{logindetails,SetLoginDetails}}>           
            {children}
        </Logincontext.Provider>
     )
}


export default LoginState
export {Logincontext};