import axios from 'axios';
import constant from "../constants/woo-constants";
import { REQUEST_SUCCESS, REQUEST_FAILED } from '../constants/request.constants';
import { checkNested } from './functions.utils';
import woocommerce, { config } from "./woocommerce.utils";

export const fetchProducts = async (kiosk_id:string) => {
        if(!kiosk_id) throw new Error('invalid kiosk id');
        console.log(constant.URL.app+'kiosk/'+kiosk_id+'/products')

        const responseStr = await fetch(constant.URL.app+'kiosk/'+kiosk_id+'/products');
        // const responseStr = await fetch('https://itc.2626.today/wp-json/wc/v2/products');
        const resJson = await responseStr.json();
        console.log("product request",resJson);
        if(checkNested(resJson,'data','status')){
                if(resJson.data.status!=200){
                        throw new Error(resJson.message?resJson.message:"data not found");
                }
        }
        return resJson;
}


export const fetchCategories = async () => {
        const response = await axios.get(constant.URL.wc+'store/products/categories');
        return response.data
}

export const createOrder = async (data:any) => {
        console.log(data)
        const response = await woocommerce.post("/orders",data);
        return response
}

export const uploadImageAsync = async ( uri, base64, token) => {
        let apiUrl = config.WC_BASE_URL + '/wp-json/wp/v2/media';
        let formData = new FormData();
    
        //dynamically get file type
        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];
    
        //generate some random number for the filename
        var randNumber1 = Math.floor(Math.random() * 100);
        var randNumber2 = Math.floor(Math.random() * 100);
    
        formData.append('file', {
            base64,
            name: `photo-${randNumber1}-${randNumber2}.${fileType}`,
            type: `image/${fileType}`,
        });
    
        let options = {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json',
                'Authorization' : 'Bearer ' + token, 
                'Content-Type': 'multipart/form-data',
                'Cache-Control' : 'no-cache',           
            },
        };
    
        console.log('header options: ',options);
        console.log('form-data options: ',formData);
    
        return fetch(apiUrl, options);
    
}