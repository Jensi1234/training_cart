import { useLocation, useParams } from 'react-router-dom';
import './ProductDetails.css'
import { getProductById } from '../services/products.service';
import { useContext } from 'react';
import useFetchData from '../hooks/useFetchData';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import useProductQty from '../hooks/useProductQty';

const ProductDetails = () => {
  const { productId } = useParams();
  const data = useLocation()
  const { onAddToCart, onBuyNow } = useContext(AppContext)
  const countProduct = data.state?.qty
  const { loading: isLoading, error, data: product } = useFetchData(getProductById, productId)
  const { qty, resetQty, isDisabled, incrementCount, decrementCount } = useProductQty(product, countProduct)

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  if (error) {
    return (
      <div>{error}</div>
    )
  }

  return (
    <div>
      {product &&
        <div className='products-details-container '>
          <div className='product-details-info'>
            <div className='product-img  d-flex flex-column align-items-end'>
              <Link to='/' className=' back-button-product-details d-block d-sm-none '>
                <button className='btn btn-back' >Back</button>
              </Link>
              <img className='product-image' src={product && product.thumbnail} alt=''></img>
            </div>
            <div className='product-data'>
              <Link to='/' className=' back-button-product-details d-none d-sm-flex '>
                <button className='btn btn-back' >Back</button>
              </Link> 
              <div className='product-title fw-bold fs-4'>{product.title}</div>
              <div className='product-price'><span className='fw-bold '>Price: </span>{product.price}/-</div>
              <div className='product-description'><span className='fw-bold' >description: </span>{product.description}</div>
              <div className=' button-increment-decrement mt-2' >
                <button className='btn product-decrement-btn me-3' onClick={decrementCount} > -</button>
                <p className='product-details-count mt-2'>{qty}</p>
                <button className='btn product-increment-btn  ms-3' onClick={incrementCount} disabled={isDisabled}> +</button>
              </div>
              {isDisabled && <div className='stock-overflow text-danger'> Out of Stock!...!...</div>}
              <div className='d-flex '>
                <button className='btn add-cart me-3' onClick={(e) => {
                  onAddToCart(e, qty, product)
                  resetQty();
                }} disabled={isDisabled} >Add To Cart</button>
                <Link to='/cart'>
                  <button className='btn buy-now' onClick={() => onBuyNow(qty, product)} disabled={isDisabled}>Buy Now</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}
export default ProductDetails;