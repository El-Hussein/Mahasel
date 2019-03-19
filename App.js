/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { I18nManager, AsyncStorage } from 'react-native';
import localization from './src/localization/localization';

import { StackNavigator } from 'react-navigation';
import configureStore from './configureReducer';
import RootNavigator from './src/navigators/RootNavigator';

import HomeScreen from './src/test/HomeScreen';
import Splash from './src/screens/Splash';
import Register from './src/screens/AuthScreens/Register';
import Signin from './src/screens/AuthScreens/Signin';

import Home from './src/screens/CategoryNavigatorScreens/Home';
import Products from './src/screens/CategoryNavigatorScreens/Products';
import Product from './src/screens/CategoryNavigatorScreens/Product';

import AddNewAds from './src/screens/AdvertiserNavigatorScreens/AddNewAds';
import AdvertiserAds from './src/screens/AdvertiserNavigatorScreens/AdvertiserAds';


const NavigationApp = StackNavigator({
    HomeScreen: { screen: HomeScreen }
})
  
const store = configureStore()
export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      rootPage: <Splash />,
      language:'ar'
    }
    setTimeout(
      ()=>{
        this.setState({
          rootPage: <RootNavigator />
        });
      },4000
    )
    localization.setLanguage(this.state.language);
    if(this.state.language=='ar'){
      I18nManager.forceRTL(true);
    }else if(this.state.language=='en'){
      I18nManager.forceRTL(false);
    }
    
  }

  async setData(){
    return await AsyncStorage.setItem('user', JSON.stringify({name:'hussein', age:23})).then((data)=>{
      console.warn('inserted successfully, ' + data)
      // async storage should take strings not objects as a paramaters
    }).catch((error)=>{
      console.warn('ERROR SET: ' + error)
    });
  }

  async getData(){
    return await AsyncStorage.getItem('usern').then((data)=>{
      if(data)
        console.warn('retrieved successfully, ' + JSON.parse(data).name)
        // update state and use JSON.parse to convert string to object
      else 
        console.warn('ERROR: not found')
    }).catch((error)=>{
      console.warn('ERROR GET: ' + error)
    });
  }

  render() {
    return (
      <Provider store={store}>
          {this.state.rootPage}
      </Provider>

      // <Signin />
      // <Register />

      // <Product />
      // <Products />
      // <Home />

      // <AddNewAds />
      // <AdvertiserAds />
    );
  }
}



// Finally Mohamed is here!!!