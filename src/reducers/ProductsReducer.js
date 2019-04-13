import {  FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE, FETCHING_PRODUCTS, FETCH_PRODUCT_SUCCESS, FETCH_PRODUCT_FAILURE, FETCHING_PRODUCT } from '../actions/constants';

const initialState = {
    products: [],
    products: {},
    pagination: {
        current_page:0,
    },
    isFetching: false,
    error: false
}

export default function productsReducer(state = initialState, action) {

    switch(action.type) {
        case FETCHING_PRODUCTS:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                products: [...state.products, ...action.data],
                pagination: action.pagination,
            }
        case FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        
        case FETCHING_PRODUCT:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_PRODUCT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                product: action.data
            }
        case FETCH_PRODUCT_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}