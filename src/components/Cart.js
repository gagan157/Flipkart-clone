import React,{useContext, useEffect, useState} from "react";
import { NavLink, useParams } from "react-router-dom";
import FlipkartCart from "./FlipkartCart";
import GroceryCart from "./GroceryCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHeart } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../context/CartContext";
import FillCArt from "./FillCArt";


function Cart() {
  const { id } = useParams();
  let {cartItems ,priceDetails} = useContext(CartContext)
  const cartNavStyle = {
    color: "var(--primary-color)",
    borderBottom: "3px solid var(--primary-color)",
  };

  return (
    <div className="cartholder">
      <div className="cart-wrap" style={{
        width: id === "FLIPKART" && cartItems.length>0?'70%':'100%'
      }}>
        <div className="cart-nav">
          <div>
            <NavLink
              className={`navlink`}
              to="/marketplace/FLIPKART"
              style={({ isActive }) => (isActive ? { ...cartNavStyle } : {})}
            >
              Flipkart
            </NavLink>
          </div>

          <div>
            <NavLink
              className={"navlink"}
              to="/marketplace/GROCERY"
              style={({ isActive }) => (isActive ? { ...cartNavStyle } : {})}
            >
              Grocery
            </NavLink>
          </div>
        </div>
        <div className="cart-item-holder">
          {id === "FLIPKART" ? (
            <>

            <div className="cart-flipkart-item" style={{height:'100%'}}>
              {cartItems.length > 0 ?<FillCArt /> : <FlipkartCart />}
            </div>
            </>
          ) : id === "GROCERY" ? (
            <div className="cart-grocery-item">
              <GroceryCart />
            </div>
          ) : null}
        </div>
      </div>
      
      {id === "FLIPKART" && cartItems.length > 0 &&  <div className="cart-price-details">
            <div className="cart-price-details-wrap">
              <div className="price-details">
                PRICE DETAILS
              </div>
              <div className="cart-price">
                <span>Price ({cartItems.length} item)</span>
                <span>&#8377;{priceDetails?.price}</span>
              </div>
              <div className="cart-discount">
                <span>Discount</span>
                <span>-&#8377;{priceDetails?.discountPrice}</span>
              </div>
              <div className="cart-delivery-charg">
                <span>Delivery Charges</span>
                <span>Free</span>
              </div>
              <div className="cart-total-amout">
                <span>Total Amount</span>
                <span>&#8377;{priceDetails?.TotalPrice}</span>
              </div>
            </div>
            <div className="cart-terms">
              <FontAwesomeIcon style={{color:'green'}} icon={faShieldHeart}/>{' '}
              Safe and Secure Payments.Easy returns.100% Authentic products.
            </div>
      </div>}
  </div>
  );
}

export default Cart;
