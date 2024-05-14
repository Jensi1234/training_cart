export const getAllProducts = async() =>{
    const productsData = await fetch('https://dummyjson.com/products')
    const productsList = await productsData.json()
    return productsList.products 
}

export const getProductById = async(productId) =>{
    const productData = await fetch(`https://dummyjson.com/products/${productId}`)
    const productInfo = await productData.json()
    return productInfo
}

export const getProduct = async(searchProduct) =>{
    const response = await fetch(`https://dummyjson.com/products/search?q=${searchProduct}`)
    const productData = await response.json()
    return productData.products
}