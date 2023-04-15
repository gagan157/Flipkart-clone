import React,{useContext, useMemo} from 'react'
import ProductContext from '../context/ProductContext'
import ProductCard from './ProductCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft , faAngleRight, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

function ProductList({pCategories,prdcatidx}) {
    const {productList} = useContext(ProductContext)
    const data = useMemo(()=>productList,[productList])

    const navigate = useNavigate();
    // const [scroll,setScroll] = useState({scrollleft:0})
    function handleLeftSlide(e){
        let box = document.querySelector(`#${pCategories}${prdcatidx}`)
        // let client = box.clientWidth   
        let BoxChildWidth =  box.children[0].clientWidth
        box.scrollLeft =  box.scrollLeft - BoxChildWidth
        
    }
    function handleRightSlide(e){
        let box = document.querySelector(`#${pCategories}${prdcatidx}`)
        let BoxChildWidth =  box.children[0].clientWidth
        box.scrollLeft =  box.scrollLeft + BoxChildWidth
       
    }
    function handleViewProduct(prd){       
        let title = prd.title.replace(prd.title,prd.title.split(' ').join('-'))
        navigate(`/product/${prd.category}/${title}`, {state: {productdetail:prd}})
    }
  return (
    <>       
        <div className='prdlistWrapper'>
            <div className='prdcatname'>
                <div style={{textAlign:'center'}}>
                    <h2>Top Deals on</h2>
                    <h2 style={{textTransform:'capitalize'}}>{pCategories}</h2>                    
                </div>
                <button>VIEW ALL</button>
            </div>
            <div className='prdlist' >                
                {!data?
                    <div style={{height:'100%' ,display:'flex',justifyContent:'center',alignItems:'center'}}><FontAwesomeIcon spin color='#2874f0' size='2xl' icon={faSpinner}/></div>
                    :
                    <>
                    <div className='prd-slide-arrow prd-slide-left-arrow'  onClick={handleLeftSlide}>
                    <FontAwesomeIcon icon={faAngleLeft}/>
                    </div>
                    <div className='prd-slide-arrow prd-slide-right-arrow'  onClick={handleRightSlide}>
                        <FontAwesomeIcon icon={faAngleRight}/>
                    </div>
                    <div className='prdlist-wrapper' id={`${pCategories}${prdcatidx}`}>
                        
                        {data.filter((item)=>{
                                          
                            return item.category === pCategories
                        }).map((prd,idx)=>{    
                            return <div key={pCategories+idx} onClick={()=>{
                                handleViewProduct(prd)
                            }} className='prdcard'>
                                <ProductCard product={prd}/>
                            </div>                        
                            
                        })}
                    </div>
                    </>
                }
               
            </div>
        </div>
    </>
  )
}

export default ProductList