import React, { useEffect, useState ,memo,useCallback } from 'react'
import ProductContext from './ProductContext'

function ProductState({children}) {
    const [productList,setProductList] = useState(null)
    const [productCategories,setProductCategorirs] = useState([])

    const  fetchProducList = useCallback( async()=>{
      try{
        let response = await fetch('https://dummyjson.com/products?limit=100')
        let data = await response.json();
       
        setProductList([...data.products]);
        let catname = '';
        let fildata =  data.products.filter((obj)=>{
          if(catname !== obj.category){
             catname = obj.category
             return true;
          }         
          return false
        }).map((objdata)=>objdata.category)

        setProductCategorirs([...fildata])
      
      }
      catch(error){
        console.log(error)
      }
    },[])

    useEffect(()=>{        
      fetchProducList();      
    },[fetchProducList])
  return (
    <ProductContext.Provider  value={{productList,productCategories}}>
        {children}
    </ProductContext.Provider>
  )
}

export default memo(ProductState)