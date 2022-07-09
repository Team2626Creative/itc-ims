export const selectCartProducts = () => (state) => state.cart.products;

export const selectIsCheckedOut = () => (state) => state.cart.checkedOut;

export const selectProductQuantityFromId = (prodId:number) =>(state) =>{
 const instance = state.cart.products.find(item => item.productId ===prodId);
 return instance?instance.quantity:0;
}

export const selectTotalItemsInCart = () => (state) => {
     return state.cart.products.reduce(( total, item) => total + item.quantity,0);
}

export const selectTotalPriceInCart = () => (state) => {
    return state.cart.products.reduce(( total, currItem) =>{
            const {price} = state.products.allProducts.data.find(prod => prod.id === currItem.productId);
            return total + (currItem.quantity*price.display_price);
        },0);
}

export const selectDetailedCart = () => (state) => {
    return state.cart.products.map((cartItem)=>{
        const productFromState = state.products.allProducts.data.find( item => item.id == cartItem.productId);
        return {
            ...productFromState,
            cartQuantity:cartItem.quantity
        }
    })
}

export const selectPaymentType = () => (state) => {
    return state.cart.paymentType
}

export const selectPaymentProof = () => (state) => {
    return state.cart.paymentProof
}