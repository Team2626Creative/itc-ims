import { 
    ADD_ITEM_TO_CART, 
    CHANGE_CHECKED_OUT_STATE, 
    REMOVE_ITEM_FROM_CART,
    DELETE_PRODUCT_FROM_CART,
    SET_PAYMENT_PROOF,
    SET_PAYMENT_TYPE
} from "../types/cart.types"

export const removeProductFromCart = (id:number) => {
    return {
        type:REMOVE_ITEM_FROM_CART,
        payload:id
    }
}

export const addProductToCart = (id:number) => {
    return {
        type:ADD_ITEM_TO_CART,
        payload:id
    }
}

export const changeCheckoutState = (isCheckedOut:boolean) =>{
    return {
        type: CHANGE_CHECKED_OUT_STATE,
        payload:isCheckedOut
    }
}

export const deleteItemFromCart = (itemId:number) => {
    return {
        type: DELETE_PRODUCT_FROM_CART,
        payload:itemId
    }
}

