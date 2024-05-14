import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
import { AppContext } from "../context/AppContext";
import dataNotFound from '../assets/DataNotfound.svg'

const Cart = () => {
  const { cartItemList: productList, qtyOfProduct } = useContext(AppContext)
  const totalPrice = productList.reduce((total, product) => {
    return total + (product.price * product.qty)
  }, 0)

  return (
    <div className='cart-details'>
      <div className="cart-container">
        <Link to='/' className='d-flex justify-content-end'>
          <button className='btn back-btn'>Back</button>
        </Link>
        <div className="cart-title">Cart</div>
        <div className="d-flex justify-content-between cart-info">
          <div className="all-items">Selected All Items</div>
          <div className="item-price ">Price</div>
        </div>
        <div>
          <div className="cart-item-list  ">
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
                <img src={dataNotFound} className='cart-nodata-imge' alt=''></img>
                <div className='cart-nodata-text'> Data not found </div>
              </div>
            )}
          </div>
        </div>
        <div className="hr d-flex justify-content-end ">
          <span className=' m-1 fw-bold ' >Subtotal ({qtyOfProduct} items): ${totalPrice}/-</span>
        </div>
        <div className="d-flex justify-content-end">
          <Link to='/checkout'>
            <button className="btn checkout-btn">Checkout</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Cart;