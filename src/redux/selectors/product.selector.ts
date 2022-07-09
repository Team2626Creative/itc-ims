export const selectAllProducts = () => (state) => state.products.allProducts;

export const selectAllCategories = () => (state) => state.products.allCategories;

export const selectProductFromId = (prodId:number) => (state) =>{
    return state.products.allProducts.data.find(item => item.id === prodId)
}