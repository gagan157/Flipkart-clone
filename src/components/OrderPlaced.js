import { faCancel, faCheckCircle, faQuestion, faTruck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import orderplaced from '../img/ordferplaced.png'
import deliverybox from '../img/deliverbox.png'
import { useLocation } from 'react-router'

function OrderPlaced() {
  const {state} = useLocation()
  const {cartItem,cartPrice} = state;
  return (
    <div className='orderplace-wrap'>
    {console.log(state)}
      <div className='order-holder'>
          <div className='order-holder-left'>
                <div className='orderBoxFift'>
                  <img src={orderplaced} alt=''/>
                  <FontAwesomeIcon className='checkIco' color='green' icon={faCheckCircle}/>
                </div>
                <div className='ordertext'>
                  <div>Order placed for &#8377;{cartPrice.TotalPrice}!</div>
                  <span>Your {cartItem.length} item will be delivery by Sun, Mar 26th 23</span>
                </div>
          </div>
          <div className='order-holder-right'>
              <div className='order-holder-right-text'>
                  <div>Why call? Just click!</div>
                  <div>Easily track all your Flipkart orders!</div>
                  <button>Go to My Orders</button>
              </div>
              <div>
                <img src={deliverybox} alt=''/>
              </div>
          </div>
      </div>
      <div className='orderdetail'>
          <div className='orderdetail-wrap'>
              <div className='orderdetail-List'>
                {cartItem.map((item,idx)=>{
                  return <div key={item.title+idx} className='orderdetail-List-card'>
                    <div className='orderdetail-List-img'>
                      <img src={item.images[0]} alt=''/>
                    </div>
                    <div className='orderdetail-List-title'>{item.title}</div>
                  </div>
                })}
              </div>
              <div className='orderdetail-time'>
                <FontAwesomeIcon icon={faTruck} color='#2874f0'/>
                <span>Delivery expected by Mar 26</span>
              </div>
              <div className='orderdetail-price'>
                <div>&#8377;{cartPrice.TotalPrice}</div>
                <button><FontAwesomeIcon color='#2874f0' icon={faCancel}/> Cancel</button><br />
                <button><FontAwesomeIcon color='#2874f0' icon={faQuestion}/> Need help?</button>
                <div>
                  <span>Total</span>{' '}
                  <span>&#8377;{cartPrice.TotalPrice}</span>
                </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default OrderPlaced