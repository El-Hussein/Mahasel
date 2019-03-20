import { FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE, FETCHING_PRODUCTS } from './constants';
import axios from 'axios';

export function fetchProducts(id) {

    return (dispatch) => {
        dispatch(getProducts())
        axios.get(`http://mahasel.feckrah.com/public/api/sub_categories/${id}`)
            .then(function (response) {
                console.log('categories API response: ' + JSON.stringify(response.data))
                if(response.data.value){
                    return(dispatch(getProductsSuccess(response.data.data)))
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

function getProductsSuccess(data) {
    return {
        type: FETCH_PRODUCTS_SUCCESS,
        data
    }
}

function getProductsFailure() {
    return {
        type: FETCH_PRODUCTS_FAILURE
    }
}