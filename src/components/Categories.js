import { getAllCategories} from '../services/categories.service';
import useFetchData from '../hooks/useFetchData';
import { useContext} from 'react';
import { ProductContext } from '../context/ProductContext';

const Categories = () => {
  const { loading: isLoading, error, data: categories } = useFetchData(getAllCategories)
  const { handleCategoryClick, selectedCategory } = useContext(ProductContext)

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
      <div className={`categories-info d-block p-3 ${selectedCategory === 'all' ? 'active' : ''}`} onClick={() => handleCategoryClick('')}> All</div>
      {categories && categories.map((category) => (
        <a key={category} className={`categories-info d-flex p-3 d-inline  ${selectedCategory === category ? 'active' : ''}`} onClick={() => handleCategoryClick(category)}> {category}</a>
      ))}
    </div>
  )
}

export default Categories;