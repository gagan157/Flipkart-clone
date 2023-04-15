import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { handleRemoveItemInCart,handleIncreQty,handleDecQty } from "../utils/ProductQuantity";

function FillCArt() {
  const { cartItems, setCartItems } = useContext(CartContext);
  return (
    <div className="fill-cart-items">
      {cartItems.map((item,idx) => {
      
        return <div key={item.id} className="fill-cartItem-card">
            <div className="fill-img">
                <img src={item.images[0]} alt=''/>
            </div>
            <div className="fill-itemDetails">
              <div className="fill-itemDetails-wrap">
                <div className="fill-title">{item.title}</div>
                <div className="fill-sub-title"></div>
                <div className="fill-price">&#x20B9;{item.price}</div>
                <div className="fill-stock"></div>
              </div>
              <div className="fill-itemDetailsBtn-wrap">
                <div className="fill-qnty">
                  <button disabled={item.quantity === 1?true:false} onClick={(e)=>handleDecQty(e,item.id,cartItems,setCartItems)}>-</button>
                    <span>{item.quantity}</span>
                  <button onClick={(e)=>handleIncreQty(e,item.id,cartItems,setCartItems)}>+</button>
                </div>
                <div className="fill-btns">
                    <button>SAVE FOR LATER</button>
                    <button onClick={(e)=>handleRemoveItemInCart(e,item.id,cartItems,setCartItems)}>REMOVE</button>
                </div>
              </div>
            </div>
        </div>;
      })}
      <div className="fill-placeOrderBtn">
        <NavLink className={'navlink'} to={'/FLIPKART/checkout'} state={{cartItems}}>PLACE ORDER </NavLink>
      </div>
    </div>
  );
}

export default FillCArt;
