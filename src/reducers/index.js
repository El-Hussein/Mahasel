import { combineReducers } from 'redux';
import CategoryReducer from './CategoryReducer';
import NavigationReducer from './NavigationReducer'
import productsReducer from './ProductsReducer';


const rootReducer = combineReducers({
    nav      : NavigationReducer,
    category : CategoryReducer,
    products: productsReducer
})

export default rootReducer