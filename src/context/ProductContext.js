import { createContext, useState } from "react";

export const ProductContext = createContext();
const ProductProvider = ({ children }) => {

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('')
    const [showSearchData, setShowSearchData] = useState(false)

    const handleCategoryClick = (category) => {
        setSelectedCategory(category)
        setSearchTerm('')
        setShowSearchData(false)
    }

    const searchItem = (search) => {
        setShowSearchData(true)
        setSearchTerm(search)
    }

    return (
        <>
            <ProductContext.Provider value={{
                handleCategoryClick,
                selectedCategory,
                searchItem,
                searchTerm,
                setSearchTerm,
                setShowSearchData,
                showSearchData
            }}>
                {children}
            </ProductContext.Provider>
        </>
    )

}

export default ProductProvider;

