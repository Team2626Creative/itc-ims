import { 
    ADD_ITEM_TO_CART,
    REMOVE_ITEM_FROM_CART, 
    CHANGE_CHECKED_OUT_STATE, 
    DELETE_PRODUCT_FROM_CART ,
} from "../types/cart.types";
const initialState = {
    checkedOut:false,
    products:[],
    paymentType:"",
    paymentProof:"",
}
const addProductToList = (list:[{ productId:number, quantity:number }],id:number) => {
   const currentElement = list.find((item) => item.productId===id);
   if(currentElement){
    return list.map((item) => {
        if(item.productId===id){
            return{
                ...item,
                quantity:item.quantity+1
            }
        }
        else{
            return{
                ...item
            }
        }
    })
   }
   else{
    return [...list,{
        productId:id,
        quantity:1
    }]
   }
} 
const removeProductFromCart =  (list:[{ productId:number, quantity:number }],id:number) => {
    const currentElement = list.find((item) => item.productId===id);
    if(currentElement){
     return list.reduce((newList,item)=>{
        if(item.productId===id){
            if(item.quantity>1){
                return [...newList,{
                    ...item,
                    quantity:item.quantity-1
                }]
            }
            return newList;
        }else{
            return [...newList,{...item}];
        }
     },[])
    }
    else{
     return list
    }
 } 

 const deleteProductFromCart = (list:[{
    productId:number,
    quantity:number
 }],itemId:number) => {
    return list.reduce((newList,currItem)=>{
        if(currItem.productId==itemId){
            return newList;
        }
        return [...newList,currItem]
    },[])
 }
export const cartReducers = (state = initialState, action:{type:string,payload?:object}) => {
    switch (action.type){
        case REMOVE_ITEM_FROM_CART:
            return{
                ...state,
                products:removeProductFromCart(state.products,action.payload),
            }
        case ADD_ITEM_TO_CART:
            return{
                ...state,
                products:addProductToList(state.products,action.payload)
            }
        case CHANGE_CHECKED_OUT_STATE:
            return{
                ...state,
                checkedOut:action.payload
            }
        case DELETE_PRODUCT_FROM_CART:
            return {
                ...state,
                products:deleteProductFromCart(state.products,action.payload)
            }
        default:
            return state;
    }
}   
