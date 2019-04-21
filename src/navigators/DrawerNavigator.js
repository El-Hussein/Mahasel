// Drawer Nav for all links with default home page 
// profile, books, settings, conditions, callus, exit

import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import {
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {I18nManager} from 'react-native';

import CategoryNavigator from './CategoryNavigator';
import AdsNavigator from './AdsNavigator';
import Orders from '../screens/DrawerNavigatorScreens/Orders';
import Conditions from '../screens/DrawerNavigatorScreens/Conditions';
import CallUs from '../screens/DrawerNavigatorScreens/CallUs';
import PersonalScreen from '../screens/DrawerNavigatorScreens/PersonalScreen';

import ContentDrawerComponent from '../components/ContentDrawerCompnent';

export default RootNavigator = createDrawerNavigator(
    {
        CategoryNavigator: {
            screen: CategoryNavigator,
        },
        Profile:{
            screen: PersonalScreen,
        },
        Orders: {
            screen: Orders,
        },
        myAds: {
            screen: AdsNavigator,
        },
        CallUs: {
            screen: CallUs,
        },
        Conditions: {
            screen: Conditions,
        },
    },
    {
        showsVerticalScrollIndicator: true,
        contentComponent:props => <ContentDrawerComponent {...props}/> ,
        drawerPosition: !I18nManager.isRTL? 'right':'left',
        drawerWidth:wp('85%'),
    }
)
