export const getAllCategories = async() =>{
    const categoriesData = await fetch('https://dummyjson.com/products/categories');
    const categorieList = await categoriesData.json()
    return categorieList;
}

export const getProductsOfACategory = async(category) =>{
    const response = await fetch(`https://dummyjson.com/products/category/${category}`);
    const productsOfACategory = await response.json()
    return productsOfACategory.products;
}