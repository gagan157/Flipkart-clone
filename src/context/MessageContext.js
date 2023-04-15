import React,{createContext, useEffect, useState} from 'react'


const MessageContext = createContext({});

function MessageState({children}) {
  const [msg,setMsg] = useState({msgStatus:false,msgType:'',msg:''});
  const [verfyCode,SetVerfiyCode] = useState('')

  useEffect(()=>{ 
    let x;
    if(msg.msgType !== 'code'){
      x = setTimeout(()=>{       
        setMsg({
          ...msg,
          msgStatus:false,
          msgType:'',
        })
      },3000)
    }
    else if(msg.msgType === 'code'){
      x = setTimeout(()=>{       
        setMsg({
          ...msg,
          msgStatus:false,         
          msgType:'',
        })
        SetVerfiyCode('')
      },20000)
    }
      

    return ()=>{
        clearTimeout(x);
    }
},[msg.msgStatus])  

  return (
    <MessageContext.Provider value={{msg, setMsg,verfyCode,SetVerfiyCode}}>
        {children}
    </MessageContext.Provider>
  )
}

export default MessageState
export {MessageContext}