import { POST_NEW_ORDER_PENDING, POST_NEW_ORDER_SUCCESS,UPDATE_ORDER_PAYMENT_PROOF, UPDATE_ORDER_PAYMENT_METHOD, UPDATE_ORDER_PRODUCT_LIST, SET_ORDER_STATE } from "../types/order.types";
import { createOrder } from "../../utils/wordpress.utils";

export function PostNewOrder() {
    return {
    
      types: [POST_NEW_ORDER_SUCCESS,POST_NEW_ORDER_PENDING,POST_NEW_ORDER_SUCCESS],
      shouldCallAPI: state => true,
      callAPI: (state) => createOrder(state.orders.current.data),
    }
}

export function setOrderPaymentMethod (data=""){
  return {
    type:UPDATE_ORDER_PAYMENT_METHOD,
    payload:data
  }
}
export function setOrderPaymentProof (data=""){
  return {
    type:UPDATE_ORDER_PAYMENT_PROOF,
    payload:data
  }
}
export function setOrderProductList (data=[]){
  return {
    type:UPDATE_ORDER_PRODUCT_LIST,
    payload:data
  }
}

export function setOrderState (data=[]){
  return {
    type:SET_ORDER_STATE,
    payload:data
  }
}