import { combineReducers } from 'redux';
import CategoryReducer from './CategoryReducer';
import NavigationReducer from './NavigationReducer'
import productsReducer from './ProductsReducer';
import AuthenticationReducer from './AuthenticationReducer';


const rootReducer = combineReducers({
    auth     : AuthenticationReducer,
    nav      : NavigationReducer,
    category : CategoryReducer,
    products : productsReducer,
})

export default rootReducer