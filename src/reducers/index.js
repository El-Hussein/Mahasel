import { combineReducers } from 'redux';
import AuthenticationReducer from './AuthenticationReducer';
import AdvertiserReducer from './AdvertiserReducer';
import CategoryReducer from './CategoryReducer';
import TermsReducer from './TermsReducer';
import productsReducer from './ProductsReducer';
import NavigationReducer from './NavigationReducer';
import LocationsReducer from './LocationsReducer';

const rootReducer = combineReducers({
    auth     : AuthenticationReducer,
    ads      : AdvertiserReducer,
    category : CategoryReducer,
    terms : TermsReducer,
    products : productsReducer,
    nav      : NavigationReducer,
    location : LocationsReducer,
})

export default rootReducer