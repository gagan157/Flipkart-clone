import React from 'react'

function SubFooter(){
    return(
        <div className='subfooter'>
            <div>become a seller</div>
            <div>advertise</div>
            <div>gift cards</div>
            <div>help center</div>
            <div>&#169; 2023-2023 FlipKart-Clone</div>
        </div>
    )
}



function Footer() {
  return (
    <footer>
        <div className='footer-wrap'>
            <div className='footer-wrap-item'>
                <ul>
                    <li>About</li>
                    <li>Contact us</li>
                    <li>About us</li>
                    <li>careers</li>
                    <li>flipkart stories</li>
                    <li>press</li>
                    <li>flipkart wholesale</li>
                    <li>coporate information</li>
                </ul>
            </div>
            <div className='footer-wrap-item'>
                <ul>
                    <li>help</li>
                    <li>payment</li>
                    <li>shiping</li>
                    <li>cancellation & returns</li>
                    <li>FAQ</li>
                    <li>report infringment</li>
                </ul>
            </div>
            <div className='footer-wrap-item'>
                <ul>
                    <li>consumer policy</li>
                    <li>return policy</li>
                    <li>terms of use</li>
                    <li>security</li>
                    <li>privacy</li>
                    <li>sitemap</li>
                    <li>grivance redressal</li>
                    <li>erp compliance</li>
                </ul>
            </div>
            <div className='footer-wrap-item'>
                <ul>
                    <li>social</li>
                    <li>facebook</li>
                    <li>twitter</li>
                    <li>youtube</li>
                </ul>
            </div>
        </div>
        <SubFooter />
    </footer>
  )
}

export default Footer;