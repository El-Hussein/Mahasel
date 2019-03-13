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
  render() {
    return (
      <Provider store={store}>
          {this.state.rootPage}
      </Provider>
      // <Signin />
      // // <Register />
    );
  }
}



