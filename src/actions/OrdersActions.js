import {  FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAILURE, FETCHING_ORDERS } from './constants';
import axios from 'axios';
import { LocalStorage } from '../localStorage/LocalStorage';

export function fetchOrders() {

    return (dispatch) => {
        dispatch(getOrders())
        axios.get(`http://mahasel.feckrah.com/public/api/sub_categories/${id}`, {headers:{'X-localization':LocalStorage.lang}})
            .then(function (response) {
                console.log('categories API response: ' + JSON.stringify(response.data))
                if(response.data.value){
                    return(dispatch(getOrdersSuccess(response.data.data)))
                }
                else{
                    return(dispatch(getOrdersFailure('network error')))
                } 
            })
            .catch(err => dispatch(getOrdersFailure('network error')))
    }
}

function getOrders() {
    return {
        type: FETCHING_ORDERS
    }
}

function getOrdersSuccess(data) {
    return {
        type: FETCH_ORDERS_SUCCESS,
        data
    }
}

function getOrdersFailure() {
    return {
        type: FETCH_ORDERS_FAILURE
    }
}