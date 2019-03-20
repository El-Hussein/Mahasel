import {  FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAILURE, FETCHING_ORDERS } from './constants';
import axios from 'axios';

export function fetchOrders() {

    return (dispatch) => {
        dispatch(getOrders())
        axios.get(`http://mahasel.feckrah.com/public/api/sub_categories/${id}`)
            .then(function (response) {
                console.log('categories API response: ' + JSON.stringify(response.data))
                if(response.data.value){
                    return(dispatch(getOrdersSuccess(response.data.data)))
                }
                else{
                    return(dispatch(getOrdersFailure(err)))
                } 
            })
            .catch(err => dispatch(getOrdersFailure(err)))
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