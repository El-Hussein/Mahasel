// Category Nav for categories flow it's stack nav with following..
// first Home -> SubCategory -> Products -> Product. 

import { createStackNavigator } from 'react-navigation';

import Home from '../screens/CategoryNavigatorScreens/Home';
import Products from '../screens/CategoryNavigatorScreens/Products';
import Product from '../screens/CategoryNavigatorScreens/Product';


export default CategoryNavigator = createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOption:{
                title:"Home", 
            }
        },
        Products: {
            screen: Products,
            navigationOption:{
                title:"Products", 
            }
        },
        Product: {
            screen: Product,
            navigationOption:{
                title:"Product", 
            }
        },
    },
    {
        navigationOptions:{
            header: null,
        }
    }
)