import { combineReducers } from 'redux';
import CategoryReducer from './CategoryReducer';
import NavigationReducer from './NavigationReducer'

const rootReducer = combineReducers({
    nav      : NavigationReducer,
    category : CategoryReducer,

})

export default rootReducer