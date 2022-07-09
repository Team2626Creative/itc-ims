import {  REQUEST_FAILED, REQUEST_NOT_STARTED, REQUEST_PENDING, REQUEST_SUCCESS } from "../../constants/request.constants";
import { 
    POST_NEW_ORDER_FAILED, 
    POST_NEW_ORDER_PENDING, 
    POST_NEW_ORDER_SUCCESS, 
    DELETE_CURRENT_ORDER,
    FETCH_ALL_ORDERS_SUCCESS,
    UPDATE_ORDER_PAYMENT_METHOD,
    UPDATE_ORDER_PRODUCT_LIST,
    UPDATE_ORDER_PAYMENT_PROOF,
    SET_ORDER_STATE,
 } from "../types/order.types";
export const orderStates = {
    SELECT_PAYMENT_TYPE:'SELECT_PAYMENT_TYPE',
    SELECT_PAYMENT_PROOF:'SELECT_PAYMENT_PROOF',
    ORDER_COMPLETED:'ORDER_COMPLETED'
  }
const initialState = {
    current:REQUEST_NOT_STARTED(
        {
            data:{
                products:[],
                paymentMethod:"",
                paymentProof:"",
            }
        }),
    all:REQUEST_SUCCESS({data:[]}),
    state:orderStates.SELECT_PAYMENT_TYPE
}

export const ordersReducers = (state = initialState, action:{type:string,payload?:object,error?:string,request?:object}) => {
    switch (action.type){
        case POST_NEW_ORDER_PENDING:
            return {
                ...state,
                current:REQUEST_PENDING({
                    data:{...state.current.data}
                })
            };
        case POST_NEW_ORDER_SUCCESS:
            return {
                ...state,
                all:REQUEST_SUCCESS({
                    data:[
                    ...state.all.data,
                    {
                        ...state.current.data,
                        ...action.payload
                    }
                ]}),
                current:REQUEST_SUCCESS({data:initialState.current.data})
            };
        case POST_NEW_ORDER_FAILED:
            return {
                ...state,
                current:REQUEST_FAILED({data:state.current.data, message:action.error})
            }
        case DELETE_CURRENT_ORDER:
            return {
                ...state,
                current:initialState.current
            };
        
        case FETCH_ALL_ORDERS_SUCCESS:
            return {
                ...state
            }
        case UPDATE_ORDER_PAYMENT_METHOD:
            return {
                ...state,
                current:REQUEST_NOT_STARTED({
                    data:{
                        ...state.current.data,
                        paymentMethod:action.payload
                    }
                })
            }
        case UPDATE_ORDER_PAYMENT_PROOF:
            return {
                ...state,
                current:REQUEST_NOT_STARTED({data:
                    {
                        ...state.current.data,
                        paymentProof:action.payload
                    }
                })
        }   
        case UPDATE_ORDER_PRODUCT_LIST:
            return {
                ...state,
                current:REQUEST_NOT_STARTED({data:
                    {
                        ...state.current.data,
                        products:action.payload
                    }
                })
        }      
        case SET_ORDER_STATE: {
            return {
                ...state,
                state:action.payload
            }
        }
        default:
            return state;
    }
}   
