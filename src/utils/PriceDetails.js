
function handlePriceDetails(){
    let cartitems = JSON.parse(localStorage.getItem('flip-cart')) 
    let deliveryChargers = 0;
    let discount = 5;

    if(cartitems){
        let price = cartitems.reduce((total,curentitem)=>{
            return total + (curentitem.price * curentitem.quantity)
        },0)

        let discountPrice = Math.floor(price * (discount / 100))
        let TotalPrice = price - discountPrice - deliveryChargers

        return {price,TotalPrice,discountPrice}
    }
}

export {handlePriceDetails}