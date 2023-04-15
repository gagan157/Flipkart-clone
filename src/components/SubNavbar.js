import React from 'react'
import topoffer from '../img/topoffer.png.png'
import tvapp from '../img/tvappliance.png'
import beauty from '../img/beauty (1).png'
import electric from '../img/electronic.png'
import fashion from '../img/fashion.png'
import flight from '../img/flight.png'
import grocery from '../img/grocery.png'
import homefur from '../img/homefurniture.png'
import mbTab from '../img/mob_tab.png'
import { useNavigate } from 'react-router'


const MenuList = [
    {img:topoffer, title:'Top Offers',link:'bestoffer'},
    {img:mbTab, title:'Mobiles & Tablets',link:'mobile tablets smartphones'},
    {img:electric, title:'Electronics',link:'laptops Automotive'},
    {img:tvapp, title:'TV & Appliances',link:'Automotive'},
    {img:fashion, title:'Fashion',link:'Tops Womens-Dresses Mens-Shirts'},
    {img:beauty, title:'Beauty',link:'skincare'},
    {img:homefur, title:'Home & Furniture',link:'Furniture Home-Decoration Lighting'},
    {img:flight, title:'Flights',link:''},
    {img:grocery, title:'Grocery',link:'groceries'},
]

function SubNavbar() {
  const navigate = useNavigate()
  return (
    <div className='subnav flex' style={{}}>
        {MenuList.map((item)=>{
            return <div key={item.title} onClick={()=>{
              let newtitle = item.title.replace(item.title,item.title.split(' ').join('-'))
              navigate(`/${newtitle}/${item.link}`)
              
              }} className='subnav-menu flex' style={{flexDirection:'column'}}>
                <img src={item.img} alt=''/>
                <div className='subnav-menu-title' style={{fontWeight:'600'}}>{item.title}</div>
            </div>
        })}
    </div>
  )
}

export default SubNavbar