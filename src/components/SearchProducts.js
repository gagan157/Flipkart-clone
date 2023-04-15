import React, { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faStar} from '@fortawesome/free-solid-svg-icons'
import ProductContext from "../context/ProductContext";

function SearchProducts() {
    const [filterData,setFilterData]  = useState([])
    let {name,filtername } = useParams();
    const {productList} = useContext(ProductContext)
    const memolist = useMemo(()=>productList,[productList])

    const filterSubNav = useCallback(()=>{
        if(filtername === 'bestoffer'){
           return memolist.filter((item)=>item.discountPercentage >=15)
        }
        let filname = filtername.split(' ')
        let fildata = filname.map((catname)=>{
            return memolist.filter((item)=> catname.toLowerCase() === item.category.toLowerCase())
        })
        console.log(fildata.flat())
        // return memolist.filter((item,idx)=> {           
        //     return filname[0]?.toLowerCase() === item.category.toLowerCase()})
        return fildata.flat()
    },[filtername,memolist])

    useEffect(()=>{        
        if(memolist !== null){
            setFilterData([...filterSubNav()])
        }
    },[memolist,filterSubNav])
  return (
    <div className="search_products_container">
    {/* {console.log(filtername)} */}
      <div className="search_products_wrap">
        <div className="search_products_wrap_items search_products_wrap_items_1">
          <div className="search_products_wrap_items_1_topHead">filters</div>
          <div className="search_products_wrap_items_1_items">
            <div className="search_products_wrap_items_1_head">categories</div>
            <div>{name}</div>
          </div>
          <div className="search_products_wrap_items_1_items">
            <div className="search_products_wrap_items_1_head">price</div>
            <div>
              <input type="range" />
            </div>
            <div className="search_products_wrap_items_1_selecter">
              <select>
                <option value="">Min</option>
              </select>
              <span>to</span>
              <select>
                <option value="">Max</option>
              </select>
            </div>
          </div>
          <div className="search_products_wrap_items_1_items">
            <div className="search_products_wrap_items_1_head">Brand</div>
            <div>
              <input type="checkbox" /> <span>Motorala</span>
            </div>
          </div>
          <div className="search_products_wrap_items_1_items">
            <div className="search_products_wrap_items_1_head">
              Customer Rating
            </div>
            <div>
              <input type="checkbox" /> <span>4* & above</span>
            </div>
          </div>
        </div>
        <div className="search_products_wrap_items search_products_wrap_items_2">
          <div className="search_products_wrap_items_2_sort_by">
            <div>sort by</div>
            <div>popularity</div>
            <div>price-low to high</div>
            <div>price-high to low</div>
            <div>newest first</div>
          </div>
          <div className="search_products_wrap_items_2_productlist_holder">
            {filterData.map((itemlis,idx)=>{
                return <div key={itemlis.title+idx} className="search_products_wrap_items_2_productlist_card">
              <div className="search_products_wrap_items_2_productlist_card_details">
                <div className="search_products_wrap_items_2_productlist_card_details_img">
                  <img
                    src={itemlis.thumbnail}
                    alt=""
                  />
                </div>
                <div className="search_products_wrap_items_2_productlist_card_details_titles">
                  <div>{itemlis.title}</div>
                  <div>{itemlis.rating}<span><FontAwesomeIcon color="orange" size="xs" icon={faStar}/> </span> 4,651 Rating & 747 Reviews</div>
                  <ul>
                    <li>8 GB RAM | 128 GB ROM | Expandable Upto 1 TB</li>
                    <li>1 Year Manufacturer Warranty for Phone and 6 Months Warranty for In the Box Accessories</li>
                  </ul>
                </div>
              </div>
              <div className="search_products_wrap_items_2_productlist_card_prices">
                <div>&#8377;{itemlis.price}</div>
                <div>
                  <span>&#8377;21,999</span> <span>{itemlis.discountPercentage}%off</span>
                </div>
                <div>free delivery</div>
                <div>Upto &#8377;18,200 off on Exchange</div>
                <div>No Cost EMI from &#8377;3,167/month</div>
              </div>
            </div>
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchProducts;
