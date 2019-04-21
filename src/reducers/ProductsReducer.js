import {  
    FETCH_PRODUCTS_SUCCESS_FIRST,
    FETCH_PRODUCTS_SUCCESS, 
    FETCH_PRODUCTS_FAILURE, 
    FETCHING_PRODUCTS, 
    FILTER_PRODUCTS_SUCCESS, 
    FILTER_PRODUCTS_SUCCESS_FIRST, 
    FILTER_PRODUCTS_FAILURE, 
    FILTERING_PRODUCTS, 
    FETCH_PRODUCT_SUCCESS, 
    FETCH_PRODUCT_FAILURE, 
    FETCHING_PRODUCT 
} from '../actions/constants';

const initialState = {
    products: [],
    productsFilter: [],
    pagination: {
        current_page:0,
    },
    paginationFilter: {
        current_page:0,
    },
    isFetching: false,
    isFiltering: false,
    error: false
}

export default function productsReducer(state = initialState, action) {

    switch(action.type) {
        case FETCHING_PRODUCTS:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_PRODUCTS_SUCCESS_FIRST:
            return {
                ...state,
                isFetching: false,
                products: [...action.data],
                productsFilter: [],
                pagination: action.pagination,
                paginationFilter: {
                    current_page:0,
                },
            }
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                products: [...state.products, ...action.data],
                productsFilter: [],
                pagination: action.pagination,
                paginationFilter: {
                    current_page:0,
                },
            }
        case FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }


        case FILTERING_PRODUCTS:
            return {
                ...state,
                isFiltering: true,
                products: [],
                pagination: {
                    current_page:0,
                },
            }
        case FILTER_PRODUCTS_SUCCESS_FIRST:
            console.warn("reducer pagination " + JSON.stringify(action.paginationFilter))
            return {
                ...state,
                isFiltering: false,
                productsFilter: action.dataFilter,
                paginationFilter: action.paginationFilter,
            }
        case FILTER_PRODUCTS_SUCCESS:
            return {
                ...state,
                isFiltering: false,
                productsFilter: [...state.productsFilter, ...action.dataFilter],
                paginationFilter: action.paginationFilter,
            }
        case FILTER_PRODUCTS_FAILURE:
            return {
                ...state,
                isFiltering: false,
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