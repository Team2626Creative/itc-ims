import axios from 'axios';
import { fetchProducts } from '../../utils/wordpress.utils';
import { fetchCategories } from '../../utils/wordpress.utils';
import {GET_PRODUCTS_PENDING,GET_PRODUCTS_SUCCESS,GET_PRODUCTS_FAILED,GET_CATEGORIES_PENDING,GET_CATEGORIES_SUCCESS,GET_CATEGORIES_FAILED} from "../types/product.types";

export const  loadProducts = (kioskId) => {
    return {
    
      types: [GET_PRODUCTS_PENDING,GET_PRODUCTS_SUCCESS,GET_PRODUCTS_FAILED],
      shouldCallAPI: state => true,
      callAPI: () => fetchProducts(kioskId)

    }
}

export function loadCategories() {
    return {
    
      types: [GET_CATEGORIES_PENDING,GET_CATEGORIES_SUCCESS,GET_CATEGORIES_FAILED],
      shouldCallAPI: state => true,
      callAPI: () => fetchCategories()
      
    }
}

