import React, { useContext } from "react";
import ProductList from "./ProductList";
import BannerAds from "./BannerAds";
import banlist1 from "./BannerAdsSend";
import ProductContext from "../context/ProductContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSpinner} from '@fortawesome/free-solid-svg-icons'


// const productCategories = ["Clothes","Electronics","Furniture","Shoes","Others"]

function Products() {
  let { productCategories } = useContext(ProductContext);
  return (
    <>
      {productCategories.length === 0 ? (
        <div style={{height:'20vh' ,display:'flex',justifyContent:'center',alignItems:'center'}}><FontAwesomeIcon spin color='#2874f0' size='2xl' icon={faSpinner}/> </div>
      ) : (
        productCategories.map((cat, idx) => {
          return (
            <div key={cat + idx}>
              {idx !== 0 ?(
                <BannerAds banlist={banlist1[idx%banlist1.length]} />
              ) : null}
              <ProductList pCategories={cat} prdcatidx={idx + 1} />
            </div>
          );
        })
      )}
    </>
  );
}

export default Products;
