import { useContext, useState } from 'react';
import './CheckOut.css'
import { AppContext } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import dataNotFound from '../assets/DataNotfound.svg'

const CheckOut = () => {
  const { cartItemList: productList, qtyOfProduct } = useContext(AppContext)
  const [userDetails, setUserDetails] = useState({ name: '', email: '', address: '' })
  const navigate = useNavigate()
  const totalPrice = productList.reduce((total, product) => {
    return total + (product.price * product.qty)
  }, 0)

  const navigatePage = () => {
    if (userDetails.name.trim() === '' || userDetails.email.trim() === '' || userDetails.address.trim() === '') {
      alert('please fill out all the fields before proceeding to payment.');
    } else {
      navigate('/payment',
        {
          state: { userDetails }
        })
    }
  }

  return (
    <div>
      <Link to='/cart' className=' checkout-back-button'>
        <button className='btn back-btn-checkout'>Back</button>
      </Link>
      <div className='checkout-container d-flex '>
        <div className='user-details'>
          <div className='user-info'>
            <div className='user-data'>User Details</div>
            <div class="mb-3">
              <label for="user-name" class="form-label">User name</label>
              <input type="text" class="form-control" id="user-name" value={userDetails.name} onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })} />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Email address</label>
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">Address</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={userDetails.address} onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}></textarea>
            </div>
          </div>
        </div>

        <div className='cart-item'>
          <div className="cart-checkout-container">
            <div className="cart-name">Checkout</div>
            <div className="d-flex justify-content-between cart-info">
              <div className=" all-items">Selected All Items</div>
              <div className=" item-price ">Price</div>
            </div>
            <div>
              <div className='cart-item-list '>

                {qtyOfProduct !== 0 ? (
                  <div>
                    {productList &&
                      productList.map((product) => {
                        return (
                          <div className=" mt-3 mt-sm-5 gap-3 gap-sm-4 cart-product-items">
                            <div >
                              <img className="img-product" src={product.thumbnail} alt=""></img>
                            </div>
                            <div className="product-details">
                              <p className="selected-product-title m-0">{product.title}</p>
                              <p className="m-0">
                                <span className=" fw-bolder cart-description">Description :</span>
                                <span className='cart-product-description'> {product.description}</span>
                              </p>
                              <p className="m-0 cart-product-price">
                                <span className="fw-bolder">Price :</span> ${product.price}/-
                              </p>
                              <p className="m-0 cart-product-qty">
                                <span className="fw-bolder">Qty :</span> {product.qty}
                              </p>
                            </div>
                            <div class="vl"></div>
                            <div className=" product-total-price ">
                              <span className="d-inline cart-product-total-price">{product.price * product.qty}</span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <div className='no-data-found-container'>
                    <img src={dataNotFound} className='cart-nodata-imge'></img>
                    <div className='cart-nodata-text'> Data not found </div>
                  </div>
                )}

              </div>
            </div>
            <div className="hr d-flex justify-content-end ">
              <span className=' m-3 fw-bold' >Subtotal ({qtyOfProduct} items): {totalPrice}/-</span> </div>
            <div className="d-flex justify-content-end">
              <button className="btn checkout-btn" onClick={() => { navigatePage() }}>Pay</button>
            </div>
          </div>
        </div >
      </div>
    </div>
  )
}

export default CheckOut;