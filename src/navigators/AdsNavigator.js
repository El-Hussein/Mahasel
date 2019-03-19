// Category Nav for categories flow it's stack nav with following..
// first Home -> SubCategory -> EditAds -> Product. 

import { createStackNavigator } from 'react-navigation';

import AdvertiserAds from '../screens/AdvertiserNavigatorScreens/AdvertiserAds';
import AddNewAds from '../screens/AdvertiserNavigatorScreens/AddNewAds';
import EditAds from '../screens/AdvertiserNavigatorScreens/EditAds';


export default CategoryNavigator = createStackNavigator(
    {
        AdvertiserAds: {
            screen: AdvertiserAds,
            navigationOption:{
                title:"AdvertiserAds", 
            }
        },
        AddNewAds: {
            screen: AddNewAds,
            navigationOption:{
                title:"AddNewAds", 
            }
        },
        EditAds: {
            screen: EditAds,
            navigationOption:{
                title:"EditAds", 
            }
        },
    },
    {
        navigationOptions:{
            header: null,
        }
    }
)