import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import NoPageFound from "./NoPageFound";
import Cart from "./Cart";
import ProductView from "./ProductView";
import PaymentModal from "./PaymentModal";
import RouteAfterLogin from "../authRoute/RouteAfterLogin";
import UserProfile from "./UserProfile";
import OrderPlaced from "./OrderPlaced";
import CommingSoon from "./CommingSoon";
import SearchProducts from "./SearchProducts";

function RoutersApp({ handleOpenModel, isModelOpen }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="marketplace/:id" element={<Cart handleOpenModel={handleOpenModel} isModelOpen={isModelOpen} />
        } />
       
      <Route path="/:id/checkout" element={<PaymentModal />} />
      <Route path="/product/:category/:name" element={<ProductView />} />
      {/* <Route path="/userProfile" element={<RouteAfterLogin component={<UserProfile/>} />} /> */}
      <Route path="/underconstruction" element={<CommingSoon />} />
      <Route path="/:name" element={<SearchProducts />} >
        <Route path="/:name/:filtername" element={<SearchProducts />} />
      </Route>
      <Route path="/user/orderPlaced/:id" element={<OrderPlaced />} />
      <Route path="*" element={<NoPageFound />} />
    </Routes>
  );
}

export default RoutersApp;
