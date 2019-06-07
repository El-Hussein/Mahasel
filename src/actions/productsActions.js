import { 
    FETCH_PRODUCTS_SUCCESS_FIRST,
    FETCH_PRODUCTS_SUCCESS, 
    FETCH_PRODUCTS_FAILURE, 
    FETCHING_PRODUCTS, 
    FILTER_PRODUCTS_SUCCESS_FIRST,
    FILTER_PRODUCTS_SUCCESS, 
    FILTER_PRODUCTS_FAILURE, 
    FILTERING_PRODUCTS, 
    FETCH_PRODUCT_SUCCESS, 
    FETCH_PRODUCT_FAILURE, 
    FETCHING_PRODUCT 
} from './constants';
import axios from 'axios';
import { LocalStorage } from '../localStorage/LocalStorage';

export function fetchProducts(id, page_number) {
    console.warn('here');
    return (dispatch) => {
        dispatch(getProducts())
        axios.get(`http://mahasel.feckrah.com/public/api/ads/${id}?page=${page_number}`, {headers:{'X-localization':LocalStorage.lang}})
            .then(function (response) {
                console.log('products API response: ' + JSON.stringify(response.data))
                if(response.data.value){
                    // console.warn(response.data.data.paginate);
                    return(dispatch(getProductsSuccess(response.data.data.ads, response.data.data.paginate)))
                }
                else{
                    return(dispatch(getProductsFailure("ERROR")))
                } 
            })
            .catch(err => dispatch(getProductsFailure('network error')))
    }
}

function getProducts() {
    return {
        type: FETCHING_PRODUCTS
    }
}

function getProductsSuccess(data, pagination) {
    if(pagination.current_page == 1){
        return {
            type: FETCH_PRODUCTS_SUCCESS_FIRST,
            data:data,
            pagination:pagination,
        }
    }else{
        return {
            type: FETCH_PRODUCTS_SUCCESS,
            data:data,
            pagination:pagination,
        }
    }
}

function getProductsFailure() {
    return {
        type: FETCH_PRODUCTS_FAILURE
    }
}


export function filterProducts(id, page_number, city_id) {
    console.warn('city_id' + city_id);
    return (dispatch) => {
        dispatch(getProductsFilter())
        axios.post(`http://mahasel.feckrah.com/public/api/search?page=${page_number}`, {'city_id':city_id, 'catogery_id':id}, {headers:{'X-localization':LocalStorage.lang}})
        .then(function (response) {
            console.warn('products filter API response: ' + JSON.stringify(response.data))
            if(response.data.value){
                // console.warn('length ' + response.data.data.ads.length);
                return(dispatch(getProductsFilterSuccess(response.data.data.ads, response.data.data.paginate)))
            }
            else{
                return(dispatch(getProductsFilterFailure("ERROR")))
            } 
        })
        .catch(err => dispatch(getProductsFilterFailure('network error')))
    }
}

function getProductsFilter() {
    return {
        type: FILTERING_PRODUCTS
    }
}

function getProductsFilterSuccess(dataFilter, paginationFilter) {
    if(paginationFilter.current_page == 1){
        return {
            type: FILTER_PRODUCTS_SUCCESS_FIRST,
            dataFilter:dataFilter,
            paginationFilter:paginationFilter,
        }
    }else{
        console.warn(JSON.stringify(dataFilter))
        return {
            type: FILTER_PRODUCTS_SUCCESS,
            dataFilter:dataFilter,
            paginationFilter:paginationFilter,
        }
    }
}

function getProductsFilterFailure() {
    return {
        type: FILTER_PRODUCTS_FAILURE
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
                    return(dispatch(getProductFailure("ERROR")))
                } 
            })
            .catch(err => dispatch(getProductFailure('network error')))
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