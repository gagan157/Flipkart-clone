import { faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { MessageContext } from "../context/MessageContext";

function ProductView(){
  const { state } = useLocation();
  const productDetail = state.productdetail;
  const [mainImg, setMainImg] = useState(productDetail.images[0]);
  const { cartItems, setCartItems } = useContext(CartContext);
  const { msg, setMsg } = useContext(MessageContext);

  const navigate = useNavigate()

  function handleProducQuentity(product) {
    let prditem = cartItems.filter((item) => {
      return item.id === product.id;
    });
    if (prditem.length) {
      return true;
    }
    return false;
  }
  function handleAddToCart(e) {
    if (handleProducQuentity(productDetail)) {
      //if click same product then quantity increase
      let mpdata = cartItems.map((item) => {
        if (item.id === productDetail.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        } else {
          return item;
        }
      });
      setMsg({
        ...msg,
        msgStatus: true,
        msgType: "S",
        msg: "Add Product again In the Cart!",
      });
      setCartItems(mpdata);
      handleAddLocalStorage(mpdata, true);
    } else {
      setMsg({
        ...msg,
        msgStatus: true,
        msgType: "S",
        msg: "Add Product In the Cart!",
      });
      handleAddLocalStorage([{ ...productDetail, quantity: 1 }], false);
      setCartItems((olddata) => {
        return [{ ...productDetail, quantity: 1 }, ...olddata];
      });
    }
  }

  function handleBuyNow(){
    if (handleProducQuentity(productDetail)) {
      //if click same product then quantity increase
      navigate("/marketplace/FLIPKART")
    } else {
      handleAddLocalStorage([{ ...productDetail, quantity: 1 }], false);
      setCartItems((olddata) => {
        return [{ ...productDetail, quantity: 1 }, ...olddata];
      });
      navigate("/marketplace/FLIPKART")
    }
  }

  function handleAddLocalStorage(mapdata, bulkdata) {
    if (bulkdata) {
      localStorage.setItem("flip-cart", JSON.stringify([...mapdata]));
    } else if (localStorage.getItem("flip-cart")) {
      let getlocaldata = JSON.parse(localStorage.getItem("flip-cart"));
      localStorage.setItem(
        "flip-cart",
        JSON.stringify([...mapdata, ...getlocaldata])
      );
    } else {
      localStorage.setItem("flip-cart", JSON.stringify([...mapdata]));
    }
  }
  return (
    <div className="product-container">
      <div className="prd-details-wrap">
        <div className="prd-left-deatils-holder">
          <div className="imgs-holder">
            <div className="imglist-holder">
              {productDetail.images.map((src, idx) => {
                return (
                  <div
                    key={src + idx}
                    style={{
                      borderBottom: "1px solid rgb(221, 221, 221)",
                      padding: ".5rem",
                    }}
                  >
                    <img
                      onMouseEnter={(e) => {
                        // console.log(e.currentTarget.parentElement)
                        let prentEle = e.currentTarget.parentElement;
                        prentEle.style.border = "1px solid #2874f0";
                        setMainImg(e.target.src);
                      }}
                      onMouseLeave={(e) => {
                        let prentEle = e.currentTarget.parentElement;
                        prentEle.style.border = "none";
                      }}
                      src={src}
                      alt=""
                    />
                  </div>
                );
              })}
            </div>
            <div className="img-holder">
              <img src={mainImg} alt="mainpic" />
            </div>
          </div>
          <div
            className="btns-holder"
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "1rem",
            }}
          >
            <button
              className="producViewaddToCartBtn"
              onClick={handleAddToCart}
            >
              Add To CART
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              style={{
                padding: "18px 8px",
                borderRadius: "2px",
                boxShadow: "0 1px 2px 0 rgba(0,0,0,.2)",
                width: "98%",
                border: "none",
                float: "left",
                backgroundColor: "#fb641b",
                color: "white",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              BUY NOW
            </button>
          </div>
        </div>
       
        <div className="prd-right-deatils-holder">
          <div className="prd-wrap">
            <div className="title">{productDetail.title}</div>
            <div className="ratting">
              <span>4.1</span> <span>7,115 Ratings & 750 Reviews</span>{" "}
              <span>Assured</span>
            </div>
            <div className="spaecial-dealEnd">
              Special price ends in less than 17h:03m:40s
            </div>
            <div className="price">
              <span>&#8377;{productDetail.price}</span> <span>2,499</span>{" "}
              <span>60% off</span>
            </div>
            <div className="availble-offers">
              <div>Available offers</div>
              <div>
                <FontAwesomeIcon icon={faTag} fade style={{ color: "green" }} />
                <span>
                  <span>Combo Offer</span> Buy 3 items save 5%; Buy 4 save 7%; Buy 5+ save
                  10%See all productsT&C
                </span>
              </div>
              <div>
                <FontAwesomeIcon icon={faTag} fade style={{ color: "green" }} />
                <span>
                  <span>Bank Offer</span> 10% instant discount on SBI Credit Card EMI
                  Transactions, up to ₹1500, on orders of ₹5,000 and aboveT&C
                </span>
              </div>
              <div>
                <FontAwesomeIcon icon={faTag} fade style={{ color: "green" }} />
                <span><span>Bank Offer</span> 5% Cashback on Flipkart Axis Bank CardT&C</span>
              </div>

              <div>
                <FontAwesomeIcon icon={faTag} fade style={{ color: "green" }} />
                <span>
                  <span>Special Price</span> Get extra 10% off (price inclusive of
                  cashback/coupon)T&C
                </span>
              </div>
            </div>
            <div className="waranty">
              <div>Warranty</div>
              <div>1 Year Warranty from the Date of Purchase</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductView;
