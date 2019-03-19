// Drawer Nav for all links with default home page 
// profile, books, settings, conditions, call_us, exit

import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import {
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {I18nManager} from 'react-native';

import CategoryNavigator from './CategoryNavigator';
import AdsNavigator from './AdsNavigator';
import Profile from '../screens/DrawerNavigatorScreens/Profile';
import Orders from '../screens/DrawerNavigatorScreens/Orders';
import Conditions from '../screens/DrawerNavigatorScreens/Conditions';
import Call_Us from '../screens/DrawerNavigatorScreens/Call_Us';

import ContentDrawerComponent from '../components/ContentDrawerCompnent';

export default RootNavigator = createDrawerNavigator(
    {
        CategoryNavigator: {
            screen: CategoryNavigator,
            navigationOptions: {
                title:'Home'
            }
        },
        Profile: {
            screen: Profile,
            navigationOption:{
                title:"Profile", 
            }
        },
        Orders: {
            screen: Orders,
            navigationOption:{
                title:"Orders", 
            }
        },
        myAds: {
            screen: AdsNavigator,
            navigationOption:{
                title:"myAds", 
            }
        },
        Call_Us: {
            screen: Call_Us,
            navigationOption:{
                title:"Call_Us", 
            }
        },
        Conditions: {
            screen: Conditions,
            navigationOptions: {
                title:'Conditions'
            }
        },
    },
    {
        showsVerticalScrollIndicator: true,
        contentComponent:props => <ContentDrawerComponent {...props}/> ,
        drawerPosition: !I18nManager.isRTL? 'right':'left',
        drawerWidth:wp('85%'),
    }
)
