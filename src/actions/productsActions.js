import { FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE, FETCHING_PRODUCTS, FETCH_PRODUCT_SUCCESS, FETCH_PRODUCT_FAILURE, FETCHING_PRODUCT } from './constants';
import axios from 'axios';
import { LocalStorage } from '../localStorage/LocalStorage';

export function fetchProducts(id, page_number) {

    return (dispatch) => {
        dispatch(getProducts())
        axios.get(`http://mahasel.feckrah.com/public/api/ads/1?page=${id}?page=${page_number}`, {headers:{'X-localization':LocalStorage.lang}})
            .then(function (response) {
                console.log('products API response: ' + JSON.stringify(response.data))
                if(response.data.value){
                    // console.warn(response.data.data.paginate);
                    return(dispatch(getProductsSuccess(response.data.data.ads, response.data.data.paginate)))
                }
                else{
                    return(dispatch(getProductsFailure(err)))
                } 
            })
            .catch(err => dispatch(getProductsFailure(err)))
    }
}

function getProducts() {
    return {
        type: FETCHING_PRODUCTS
    }
}

function getProductsSuccess(data, pagination) {
    return {
        type: FETCH_PRODUCTS_SUCCESS,
        data:data,
        pagination:pagination,
    }
}

function getProductsFailure() {
    return {
        type: FETCH_PRODUCTS_FAILURE
    }
}


export function fetchProduct(id) {

    return (dispatch) => {
        dispatch(getProduct())
        axios.get(`http://mahasel.feckrah.com/public/api/get_ad/${id}`)
            .then(function (response) {
                console.log('Product API response: ' + JSON.stringify(response.data))
                if(response.data.value){
                    // console.log(response.data.data);
                    return(dispatch(getProductSuccess(response.data.data)))
                }
                else{
                    return(dispatch(getProductFailure(err)))
                } 
            })
            .catch(err => dispatch(getProductFailure(err)))
    }
}

function getProduct() {
    return {
        type: FETCHING_PRODUCT
    }
}

function getProductSuccess(data) {
    return {
        type: FETCH_PRODUCT_SUCCESS,
        data
    }
}

function getProductFailure() {
    return {
        type: FETCH_PRODUCT_FAILURE
    }
}