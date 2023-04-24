import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useNavigate, useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import ProductContext from "../context/ProductContext";

function SearchProducts() {
  const [filterStat,setFilterStat] = useState(false);
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState([]);
  const [menualFilter, setManualFilter] = useState([]);
  const [filterManage, setFilterManage] = useState({ brand: [], price: [] });

  let { name, filtername } = useParams();
  const { productList } = useContext(ProductContext);
  const memolist = useMemo(() => productList, [productList]);

  const filterSubNav = useCallback(() => {
    if (filtername === "bestoffer") {
      return memolist.filter((item) => item.discountPercentage >= 15);
    }
    let filname = filtername.split(" ");
    let fildata = filname.map((catname) => {
      return memolist.filter(
        (item) => catname.toLowerCase() === item.category.toLowerCase()
      );
    });
    return fildata.flat();
  }, [filtername, memolist]);

  const FilterBrandNames = useMemo(() => {
    let bname = "";
    return filterData
      ?.filter((item) => {
        if (bname !== item.brand) {
          bname = item.brand;
          return true;
        }
        return false;
      })
      .map((item) => {
        return { name: item.brand, checked: false };
      });
  }, [filterData]);

  const handleBrandFilter = useCallback(
    (data) => {
      console.log("handlebrand");
      let { brand } = filterManage;
      let particularData = brand.some((item) => item.name === data.name);

      if (particularData) {
        let fmdata = brand.filter((item) => item.name !== data.name);
        setFilterManage({ ...filterManage, brand: [...fmdata] });
        setManualFilter([
          ...menualFilter.filter((item) => item.brand !== data.name),
        ]);
      } else {
        let fndata = [...filterManage.brand, data];
        setFilterManage({ ...filterManage, brand: [...fndata] });

        let filldata = fndata
          .map((item) => item.name)
          .map((bn) => {
            return filterData.filter((item) => item.brand === bn);
          })
          .flat();

        setManualFilter([...filldata]);
      }
    },
    [filterManage.brand, menualFilter]
  );

  const lowToHighPrice = () =>
    setManualFilter([...menualFilter.sort((a, b) => a.price - b.price)]);
  const highToLowPrice = () =>
    setManualFilter([...menualFilter.sort((a, b) => b.price - a.price)]);
  const popularity = () => setManualFilter([...filterData]);

  useEffect(() => {
    if (filterManage.brand.length === 0) {
      setManualFilter([...filterData]);
    }
  }, [filterManage.brand]);

  useEffect(() => {
    if (memolist !== null) {
      setFilterData([...filterSubNav()]);
      setManualFilter([...filterSubNav()]);
    }
  }, [memolist, filterSubNav]);

  let filterStyle = filterStat?{
    height:0,visibility:"hidden",opacity:0, padding:0
    
  }:{height:'unset',visibility:"visible",opacity:1, padding:'1rem'}
  return (
    <div className="search_products_container">
      <div className="search_products_wrap">
        <div className="search_products_wrap_items search_products_wrap_items_1">
          <div onClick={()=>{setFilterStat(!filterStat)}} className="search_products_wrap_items_1_topHead flex">
            filters
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
         <div className="allFiltersWrap" style={{...filterStyle}}>
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
            {FilterBrandNames.map((brand, idx) => {
              return (
                <div key={brand.name + idx}>
                  <input
                    onChange={(e) => {
                      handleBrandFilter({
                        name: brand.name,
                        checked: e.target.checked,
                      });
                    }}
                    type="checkbox"
                    value={brand.name}
                    name="brand"
                  />{" "}
                  <span>{brand.name}</span>
                </div>
              );
            })}
            {/* <input type="checkbox" /> <span>Motorala</span> */}
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
        </div>
        <div className="search_products_wrap_items search_products_wrap_items_2">
          <div className="search_products_wrap_items_2_sort_by">
            <div>sort by</div>
            <div onClick={() => popularity()}>popularity</div>
            <div onClick={() => lowToHighPrice()}>price-low to high</div>
            <div onClick={() => highToLowPrice()}>price-high to low</div>
          </div>
          <div className="search_products_wrap_items_2_productlist_holder">
            {menualFilter.map((itemlis, idx) => {
              return (
                <div
                  onClick={() => {
                    let title = itemlis.title.replace(
                      itemlis.title,
                      itemlis.title.split(" ").join("-")
                    );
                    navigate(`/product/${itemlis.category}/${title}`, {
                      state: { productdetail: itemlis },
                    });
                  }}
                  key={itemlis.title + idx}
                  className="search_products_wrap_items_2_productlist_card"
                >
                  <div className="search_products_wrap_items_2_productlist_card_details">
                    <div className="search_products_wrap_items_2_productlist_card_details_img">
                      <img src={itemlis.thumbnail} alt="" />
                    </div>
                    <div className="search_products_wrap_items_2_productlist_card_details_titles">
                      <div>{itemlis.title}</div>
                      <div>
                        {itemlis.rating}
                        <span>
                          <FontAwesomeIcon
                            color="orange"
                            size="xs"
                            icon={faStar}
                          />{" "}
                        </span>{" "}
                        4,651 Rating & 747 Reviews
                      </div>
                      <ul>
                        <li>{itemlis.description}</li>
                        <li style={{ color: "green" }}>
                          Stock: {itemlis.stock}
                        </li>
                        <li>
                          1 Year Manufacturer Warranty for Phone and 6 Months
                          Warranty for In the Box Accessories
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="search_products_wrap_items_2_productlist_card_prices">
                    <div>&#8377;{itemlis.price}</div>
                    <div>
                      <span>&#8377;21,999</span>{" "}
                      <span>{itemlis.discountPercentage}%off</span>
                    </div>
                    <div>free delivery</div>
                    <div>Upto &#8377;18,200 off on Exchange</div>
                    <div>No Cost EMI from &#8377;3,167/month</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchProducts;
