import './PageContainer.css'
import Products from './Products';
import Categories from './Categories';
import { getAllProducts, getProduct } from '../services/products.service';
import useFetchData from '../hooks/useFetchData';
import { getProductsOfACategory } from '../services/categories.service';
import { useContext, useState, useEffect } from 'react';
import { ProductContext } from '../context/ProductContext';

const PageContainer = () => {
  const { loading: isLoading, error, data: products } = useFetchData(getAllProducts)
  const { selectedCategory, showSearchData } = useContext(ProductContext)
  const { data: selectedProducts } = useFetchData(getProductsOfACategory, selectedCategory)
  const { searchTerm } = useContext(ProductContext)
  const { data: serachData } = useFetchData(getProduct, searchTerm)
  const [productInfo, setProductInfo] = useState([])

  useEffect(() => {
    const selectProductData = () => {
      if (showSearchData) {
        setProductInfo(serachData)
      } else if ((selectedCategory || []).length === 0) {
        setProductInfo(products)
      } else {
        setProductInfo(selectedProducts)
      }
    }

    selectProductData()
  }, [selectedProducts, serachData, showSearchData, products, selectedCategory])

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
    <>
      <div className='container-fluid d-flex p-0 mt-4' >
        <div className='categories-data p-5 d-none d-sm-block'>
          <Categories />
        </div>
        <div className='products-data d-flex p-5 flex-wrap '>
          {productInfo && productInfo.map((product, index) => {
            return (
              <Products key={index} product={product} />
            )
          })}
        </div>
      </div>
    </>
  )
}

export default PageContainer;

