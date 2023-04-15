import React,{useContext} from 'react'
import { MessageContext } from '../context/MessageContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faBoxOpen } from '@fortawesome/free-solid-svg-icons'


function Message() {
    const {msg} = useContext(MessageContext)
    const msgStyle = {
        position:'fixed',
        bottom:'-100px',
        right:'0',
        left : '0',
        margin : 'auto',
        width : 'fit-content',
        backgroundColor:'black',
        color:'white',
        zIndex:'100',
        padding:'1rem 1.5rem',
        borderRadius:'3px',
        boxShadow:'0 1px 3px #888',
        opacity:0,
        visibility:'hidden',
        letterSpacing:'1px',
        transition:'all 1s'
    }
 
  return (
    <>
        {
        <div className='msg' 
        style={{...msgStyle,
        // backgroundColor:`${msg.msgType === 'E'?'red':'green'}`,
        bottom:`${msg.msgStatus?'10px':'-100px'}`,
        opacity:`${msg.msgStatus?'1':'0'}`,
        visibility:`${msg.msgStatus?'visible':'hidden'}`,
        
        }}>
           <FontAwesomeIcon style={{
            color:'green',
            fontSize:'1.1rem',
            fontWeight:'bolder',
           }} icon={faCheckCircle}/>{' '}{msg.msg} {msg.msgType === 'o' && <FontAwesomeIcon color='green' bounce icon={faBoxOpen}/>}
        </div>}
    </>
  )
}

export default Message