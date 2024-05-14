import { useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import useProductQty from '../hooks/useProductQty';

const Products = ({ product }) => {
  const { onAddToCart, onBuyNow } = useContext(AppContext)
  const navigate = useNavigate()
  const { qty, resetQty, isDisabled, incrementCount, decrementCount } = useProductQty(product);

  const navigatePage = () => {
    navigate(`/product/${product.id}`,
      {
        state: { qty }
      })
  }

  return (
    <span className="card m-3" style={{ width: '18rem' }} >
      <img src={product.thumbnail} className="card-img-top   products-img" alt="..." onClick={() => { navigatePage() }} />
      <div className="card-body" >
        <h3 className="card-title text-center">{product.title}</h3>
        <p className='text-center'><span className='card-info'>Price: </span> {product.price}/-</p>
        <div className='text-center d-flex align-items-center justify-content-center mx-5 mb-2'>
          <button className='btn decrement-btn' onClick={decrementCount} >-</button>
          <p className=' count mt-3'>{qty}</p>
          <button className='btn increment-btn  ' onClick={incrementCount} disabled={isDisabled} > +</button>
        </div>
        {isDisabled && <div className='stock-overflow text-danger'> Out of Stock!...</div>}
        <div className='d-flex justify-content-center'>
          <button className='btn add-cart me-3' onClick={(e) => {
            onAddToCart(e, qty, product)
            resetQty();
          }} disabled={isDisabled}>Add To Cart</button>
          <Link to='/cart'>
            <button className='btn buy-now ' onClick={() => onBuyNow(qty, product)} disabled={isDisabled || qty === 0}>Buy Now</button>
          </Link>
        </div>
      </div>
    </span>
  )
}

export default Products;