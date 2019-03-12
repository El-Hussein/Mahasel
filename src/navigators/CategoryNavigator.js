// Category Nav for categories flow it's stack nav with following..
// first Home -> SubCategory -> Products -> Product. 

import { createStackNavigator } from 'react-navigation';

import Home from '../pages/Home';
import SubCategory from '../pages/SubCategory';
import Products from '../pages/Products';
import Product from '../pages/Product';


export default CategoryNavigator = createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOption:{
                title:"Home", 
            }
        },
        SubCategory: {
            screen: SubCategory,
            navigationOption:{
                title:"SubCategory", 
            }
        },
        Product: {
            screen: Product,
            navigationOption:{
                title:"Product", 
            }
        },
        Products: {
            screen: Products,
            navigationOption:{
                title:"Products", 
            }
        },
    },
    {
        navigationOptions:{
            header: null,
        }
    }
)