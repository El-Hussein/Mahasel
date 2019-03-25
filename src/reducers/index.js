import { combineReducers } from 'redux';
import AuthenticationReducer from './AuthenticationReducer';
import AdvertiserReducer from './AdvertiserReducer';
import CategoryReducer from './CategoryReducer';
import productsReducer from './ProductsReducer';
import NavigationReducer from './NavigationReducer'


const rootReducer = combineReducers({
    auth     : AuthenticationReducer,
    ads     : AdvertiserReducer,
    category : CategoryReducer,
    products : productsReducer,
    nav      : NavigationReducer,
})

export default rootReducer