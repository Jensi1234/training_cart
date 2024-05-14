import { createContext, useState } from "react";
export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [qtyOfProduct, setQtyOfProduct] = useState(0)
    const [cartItemList, setCartItemList] = useState([])

    const onAddToCart = (e, qty, product) => {
        e.stopPropagation()
        setQtyOfProduct(qtyOfProduct + qty)
        const productIndex = cartItemList.findIndex(item => item.id === product.id);

        if (productIndex !== -1) {
            cartItemList[productIndex].qty += qty;
            setCartItemList(cartItemList)
        }
        else {
            setCartItemList([...cartItemList, { ...product, qty }])
        }
    }

    const onBuyNow = (qty, productData) => {
        setQtyOfProduct(qty)
        setCartItemList([{ ...productData, qty: qty }])
    }

    return (
        <AppContext.Provider value={{
            qtyOfProduct,
            onAddToCart,
            cartItemList,
            onBuyNow
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;