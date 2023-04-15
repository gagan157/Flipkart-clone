import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import MessageState from "./context/MessageContext";
import LoginState from "./context/LoginContext";
import ProductState from "./context/ProductState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProductState>
    <MessageState>
      <LoginState>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LoginState>
    </MessageState>
    </ProductState>
  </React.StrictMode>
);
