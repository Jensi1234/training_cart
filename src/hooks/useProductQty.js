import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const useProductQty = (product,countProduct) => {
    const [qty, setQty] = useState(countProduct || 1);
    const { cartItemList } = useContext(AppContext)
    
    let isDisabled,matchingCartItem;
    if(product){
        matchingCartItem = cartItemList.find(item => item.id === product.id)
        isDisabled = (product.stock - (matchingCartItem?.qty || 0)) < qty;
    }

    const incrementCount = () => {
        setQty(qty + 1)
    }

    const decrementCount = (e) => {
        e.stopPropagation()
        setQty(qty > 0 ? qty - 1 : qty)
    }

    const resetQty = () => {
        setQty(1);
        
    }

    return {
        qty,
        resetQty,
        isDisabled,
        incrementCount,
        decrementCount
    }
}

export default useProductQty;