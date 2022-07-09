import {
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_PENDING,
    GET_CATEGORIES_FAILED,
    GET_CATEGORIES_PENDING,
    GET_CATEGORIES_SUCCESS,
    GET_PRODUCTS_FAILED,
} from "../types/product.types";
import { REQUEST_SUCCESS,REQUEST_FAILED, REQUEST_PENDING } from '../../constants/request.constants';

const initialState = {
    allProducts:REQUEST_SUCCESS({data:[]}),
    allCategories:REQUEST_SUCCESS({data:[]})
}


export const productsReducers = (state = initialState, action:{type:string,payload?:object,error?:string}) => {

    switch (action.type){
        case GET_PRODUCTS_SUCCESS:
			return {
                ...state,
                allProducts:REQUEST_SUCCESS({data:[...action.payload],message:""}),
            } ;
            break;
        case GET_PRODUCTS_FAILED:
                return {
                    ...state,
                    allProducts:REQUEST_FAILED({data:[],message:action.error}),
            } ;
            break;
        case GET_PRODUCTS_PENDING:
                return {
                    ...state,
                    allProducts:REQUEST_PENDING({data:[],message:""}),
            } ;
            break;
        case GET_CATEGORIES_SUCCESS:
                return {
                    ...state,
                    allCategories:REQUEST_SUCCESS({data:[...action.payload],message:""}),
                } ;
                break;
        case GET_CATEGORIES_FAILED:
                    return {
                        ...state,
                        allCategories:REQUEST_FAILED({data:[],message:action.error}),
                } ;
                break;
        case GET_CATEGORIES_PENDING:
                    return {
                        ...state,
                        allCategories:REQUEST_PENDING({data:[],message:""}),
                } ;
                break;
		default:
			return state;
    }
}   
