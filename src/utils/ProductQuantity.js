function handleRemoveItemInCart(event,id,cartItems,setCartItems){
    setCartItems(cartItems.filter(item=>item.id !== id))
}
function handleIncreQty(e,id,cartItems,setCartItems){
let incdata = cartItems.map((item)=>{
  if(item.id === id){
    return {...item,quantity : item.quantity+1};
  }
  else{
    return item
  }
})
setCartItems([...incdata])
}
function handleDecQty(e,id,cartItems,setCartItems){
let decdata = cartItems.map((item)=>{
  if(item.id === id){
    return {...item,quantity : item.quantity-1};
  }
  else{
    return item
  }
})
setCartItems([...decdata])
}

export {handleRemoveItemInCart,handleDecQty,handleIncreQty}