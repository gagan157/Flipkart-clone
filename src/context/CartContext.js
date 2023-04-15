import { createContext, useEffect, useState } from "react";
import { handlePriceDetails } from "../utils/PriceDetails";

let CartContext = createContext([]);


const CartState = ({children})=>{
    const [cartItems,setCartItems] = useState([]);
    const [priceDetails,setPriceDetails] = useState({})

    useEffect(()=>{
        if(localStorage.getItem('flip-cart')){
            let cardata = JSON.parse(localStorage.getItem('flip-cart'));
            setCartItems([...cardata])
            
            let dataprice = JSON.parse(localStorage.getItem('flip-cart-price'))
            setPriceDetails({...dataprice})
        }
    },[])
    useEffect(()=>{
        if(cartItems.length){
            localStorage.setItem('flip-cart',JSON.stringify([...cartItems]))
            let pricedata =  handlePriceDetails()
            localStorage.setItem('flip-cart-price',JSON.stringify({...pricedata}))
            setPriceDetails({...pricedata})
        }
        else{
            localStorage.removeItem('flip-cart')
            localStorage.removeItem('flip-cart-price')
        }
    },[cartItems])
    return(
        <CartContext.Provider value={{cartItems,setCartItems,priceDetails}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartState;
export {CartContext};