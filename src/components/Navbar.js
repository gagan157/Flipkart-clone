import React, { useContext, useEffect, useState } from "react";
import logo from "../img/homelogo.png";
import pluslogo from "../img/pluslogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUser,
  faHeart,
  faTrophy,
  faBoxOpen,
  faShoppingCart,
  faAngleDown,
  faBell,
  faClipboardQuestion,
  faArrowTrendUp,
  faArrowDownLong,
  faRightFromBracket,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCreditCard,
  faPlusSquare,
} from "@fortawesome/free-regular-svg-icons";
import { Logincontext } from "../context/LoginContext";
import { NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import ProductContext from "../context/ProductContext";

const loginDropdownCotent = [
  { icon: faUser, title: "My Profile", link: "underconstruction" },
  {
    icon: faPlusSquare,
    title: "FlipKart Plus Zone",
    link: "underconstruction",
  },
  { icon: faBoxOpen, title: "Orders", link: "underconstruction" },
  { icon: faHeart, title: "Wishlist", link: "underconstruction" },
  { icon: faTrophy, title: "Rewards", link: "underconstruction" },
  { icon: faCreditCard, title: "Gift Cards", link: "underconstruction" },
];
const moreDropdown = [
  {
    icon: faBell,
    title: "Notification Preferences",
    link: "underconstruction",
  },
  {
    icon: faClipboardQuestion,
    title: "24x7 Customer Care",
    link: "underconstruction",
  },
  { icon: faArrowTrendUp, title: "Advertise", link: "underconstruction" },
  { icon: faArrowDownLong, title: "Download App", link: "underconstruction" },
];

function Navbar({ handleOpenModel, isModelOpen }) {
  let { logindetails, SetLoginDetails } = useContext(Logincontext);
  const { productList } = useContext(ProductContext);
  const [searchItem,setSearchItem] = useState('');
  const [searchdata,setSearchData] = useState([]);
  let { cartItems } = useContext(CartContext);
  const [mobilebar,setMobileBar] = useState(false)
  const navigate = useNavigate();
  const { name, isLogin } = logindetails;
  function handlelogin(e) {
    handleOpenModel({
      ...isModelOpen,
      login: true,
      signup: false,
    });
  }
  function handlesignup(e) {
    e.stopPropagation();
    handleOpenModel({
      ...isModelOpen,
      login: false,
      signup: true,
    });
  }

  function handleLogout() {
    if (localStorage.getItem("FlipKart_isLogin")) {
      localStorage.removeItem("FlipKart_isLogin");
      SetLoginDetails({
        ...logindetails,
        name: "",
        mobile: "",
        email: "",
        isLogin: false,
      });
    }
  }
  function handleGotoHome() {
    navigate("/");
  }

  function handleSerachOnChange(e){
    setSearchItem(e.target.value);
    
    if(e.target.value === ''){
      setSearchData([])
    }
  }

  function handleSerachSubmit(e){
    e.preventDefault();
    if(searchItem){
      setSearchData([])
      setSearchItem('')
      navigate(`/${'others'}/${searchItem}`)
    }
  }
  
  useEffect(()=>{
    if(searchItem){
      let id = setTimeout(()=>{        
        let searchdata = productList.filter((item)=>{return item.category.toLowerCase().indexOf(searchItem.toLowerCase()) !== -1 || item.title.toLowerCase().indexOf(searchItem.toLowerCase()) !== -1 || item.description.toLowerCase().indexOf(searchItem.toLowerCase()) !== -1})
        setSearchData([...searchdata])
      },1000);
      return ()=> clearTimeout(id)
    }
  },[searchItem,productList])

  useEffect(()=>{
    setMobileBar(false)
  },[navigate])
  return (
    <>
      <nav>
        <div className="logo">
          <div className="logo-img">
            <img onClick={handleGotoHome} src={logo} alt="logo" />
          </div>
          <div className="logo-slogun">
            <span>Explore</span> <span>Plus</span>
            <img src={pluslogo} style={{ width: "10px" }} alt="pluslogo" />
          </div>
        </div>
        <div className="nav-bar-main">
          <div className="form">
            <form onSubmit={handleSerachSubmit}>
              <input
                onChange={handleSerachOnChange}
                type={"text"}
                value={searchItem}
                placeholder="Search for products, brands and more"
              />
              <button type="submit" className="srch-btn">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>
            <div className="Search_form_result" >
                {searchdata && searchdata.map((prd,idx)=>{
                   return <div onClick={()=>{ 
                    setSearchData([])
                    setSearchItem('')
                    let title = prd.title.replace(prd.title,prd.title.split(' ').join('-'))
                    navigate(`/product/${prd.category}/${title}`, {state: {productdetail:prd}})
                   }} className="Search_form_result_items" key={prd.title+idx}>{prd.title}</div>
                })}
            </div>
          </div>

          <div className="login">
            <div className="login-btn">
              {isLogin ? (
                <div className="username">{name}</div>
              ) : (
                <div className="login-text" onClick={handlelogin}>
                  Login
                </div>
              )}
              <div className="login-details">
                <div className="">
                  {!isLogin && (
                    <div
                      className="new-customers flex"
                      style={{
                        padding: "1.5rem .8rem",
                        borderBottom: "1px solid #dbdbdb",
                        cursor: "pointer",
                      }}
                    >
                      <div>New Customer?</div>
                      <div className="signup" onClick={handlesignup}>
                        Sign Up
                      </div>
                    </div>
                  )}
                  {loginDropdownCotent.map((item, idx) => {
                    return (
                      <NavLink
                        to={`/${item.link}`}
                        key={item.title + idx}
                        className="navlink"
                      >
                        <div
                          className="flex logindropdown"
                          style={{ justifyContent: "flex-start" }}
                        >
                          <FontAwesomeIcon icon={item.icon} />
                          <div style={{ fontWeight: "100", color: "black" }}>
                            {item.title}
                          </div>
                        </div>
                      </NavLink>
                    );
                  })}
                  {isLogin && (
                    <div
                      className="flex logindropdown"
                      style={{ justifyContent: "flex-start" }}
                      onClick={handleLogout}
                    >
                      <FontAwesomeIcon icon={faRightFromBracket} />
                      <div style={{ fontWeight: "100" }}>LogOut</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="seller">Become a Seller</div>
          <div className="more-dropdown">
            <div className="more flex">
              <span>More</span>
              <FontAwesomeIcon
                icon={faAngleDown}
                style={{ fontSize: ".8rem", marginLeft: ".3rem" }}
              />
            </div>
            <div className="more-dropdown-details">
              {moreDropdown.map((item) => {
                return (
                  <div
                    key={item.title}
                    className="flex moredropdown"
                    style={{ justifyContent: "flex-start" }}
                  >
                    <FontAwesomeIcon icon={item.icon} />
                    <div style={{ fontWeight: "100" }}>{item.title}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <NavLink
            className="cart navlink"
            to="/marketplace/FLIPKART"
            style={{
              cursor: "pointer",
              color: "white",
              position: "relative",
            }}
          >
            {cartItems.length > 0 && (
              <div
                className="cart-total-item"
                style={{
                  position: "absolute",
                  backgroundColor: "red",
                  padding: ".1rem .2rem",
                  borderRadius: "5px",
                  top: "-10px",
                  left: "10px",
                  fontSize: ".8rem",
                }}
              >
                {cartItems.length}
              </div>
            )}
            <FontAwesomeIcon icon={faShoppingCart} />
            <span style={{ marginLeft: ".5rem" }}>Cart</span>
          </NavLink>
        </div>
        <FontAwesomeIcon onClick={(e)=>{
          setMobileBar(!mobilebar)          
        }} className="nav-bar-icon" size="xl" icon={faBars} />

        {mobilebar && <div className="nav-bar-open">
          <div className="form">
            <form>
              <input
                type={"text"}
                placeholder="Search for products, brands and more"
              />
              <FontAwesomeIcon className="srch-btn" icon={faMagnifyingGlass} />
            </form>
          </div>

          <div className="login">
            <div className="login-btn">
              {isLogin ? (
                <div className="username">{name}</div>
              ) : (
                <div className="login-text" onClick={handlelogin}>
                  Login
                </div>
              )}
              <div className="login-details">
                <div className="">
                  {!isLogin && (
                    <div
                      className="new-customers flex"
                      style={{
                        padding: "1.5rem .8rem",
                        borderBottom: "1px solid #dbdbdb",
                        cursor: "pointer",
                      }}
                    >
                      <div>New Customer?</div>
                      <div className="signup" onClick={handlesignup}>
                        Sign Up
                      </div>
                    </div>
                  )}
                  {loginDropdownCotent.map((item, idx) => {
                    return (
                      <NavLink
                        to={`/${item.link}`}
                        key={item.title + idx}
                        className="navlink"
                      >
                        <div
                          className="flex logindropdown"
                          style={{ justifyContent: "flex-start" }}
                        >
                          <FontAwesomeIcon icon={item.icon} />
                          <div style={{ fontWeight: "100", color: "black" }}>
                            {item.title}
                          </div>
                        </div>
                      </NavLink>
                    );
                  })}
                  {isLogin && (
                    <div
                      className="flex logindropdown"
                      style={{ justifyContent: "flex-start" }}
                      onClick={handleLogout}
                    >
                      <FontAwesomeIcon icon={faRightFromBracket} />
                      <div style={{ fontWeight: "100" }}>LogOut</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="seller">Become a Seller</div>
          <div className="more-dropdown">
            <div className="more flex">
              <span>More</span>
              <FontAwesomeIcon
                icon={faAngleDown}
                style={{ fontSize: ".8rem", marginLeft: ".3rem" }}
              />
            </div>
            <div className="more-dropdown-details">
              {moreDropdown.map((item) => {
                return (
                  <div
                    key={item.title}
                    className="flex moredropdown"
                    style={{ justifyContent: "flex-start" }}
                  >
                    <FontAwesomeIcon icon={item.icon} />
                    <div style={{ fontWeight: "100" }}>{item.title}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <NavLink
            className="cart navlink"
            to="/marketplace/FLIPKART"
            style={{
              cursor: "pointer",
              color: "white",
              position: "relative",
            }}
          >
            {cartItems.length > 0 && (
              <div
                className="cart-total-item"
                style={{
                  position: "absolute",
                  backgroundColor: "red",
                  padding: ".1rem .2rem",
                  borderRadius: "5px",
                  top: "-10px",
                  left: "10px",
                  fontSize: ".8rem",
                }}
              >
                {cartItems.length}
              </div>
            )}
            <FontAwesomeIcon icon={faShoppingCart} />
            <span style={{ marginLeft: ".5rem" }}>Cart</span>
          </NavLink>
        </div>}
      </nav>
    </>
  );
}

export default Navbar;
