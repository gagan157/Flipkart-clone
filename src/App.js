import React, { useEffect, useState } from "react";
import "./styles/App.css";
import Model from "./components/Model";
import Navbar from "./components/Navbar";
import RoutersApp from "./components/RoutersApp";
import Message from "./components/Message";
import CartState from "./context/CartContext";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import Footer from './components/Footer'

const App = () => {
  const [isModelOpen, setIsModelOpen] = useState({
    login: false,
    signup: false,
  });

  function handleOpenModel(obj) {
    setIsModelOpen(obj);
  }

  useEffect(() => {
    if (isModelOpen.login || isModelOpen.signup) {
      if (typeof window != "undefined" && window.document) {
        document.body.style.overflow = "hidden";
      }
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModelOpen]);
  return (
    <>
      <Message />
      <CartState>
        {(isModelOpen.login || isModelOpen.signup) && (
          <Model handleOpenModel={handleOpenModel} isModelOpen={isModelOpen} />
        )}
        <Navbar handleOpenModel={handleOpenModel} isModelOpen={isModelOpen} />

        <div style={{ marginTop: "56px" }}></div>

        <RoutersApp
          handleOpenModel={handleOpenModel}
          isModelOpen={isModelOpen}
        />
      </CartState>
      <Footer /> 
    </>
  );
};

export default App;
