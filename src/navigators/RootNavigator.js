// root with two navigations 
// first navigation is register navigation
// second navigation is Drawer Navigation

import { createStackNavigator } from 'react-navigation';
import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';


import AuthNav from './AuthNavigator';
import HomeNav from './DrawerNavigator';


export const RootNavigator = createStackNavigator(
    {
        AuthNav: {
            screen: AuthNav,
            navigationOption:{
                title:"Auth",
                header: null, 
            }
        },
        HomeNav: {
            screen: HomeNav,
            navigationOption:{
                title:"Home", 
            }
        },
    },
    {
        navigationOptions:{
            header: null,
        }
    }
)

export const middleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);

export const RootNav = reduxifyNavigator(RootNavigator, "root");

const mapStateToProps = (state) => ({
    state: state.nav,
});

const RootNavWithRedux = connect(mapStateToProps)(RootNav);

export default RootNavWithRedux;