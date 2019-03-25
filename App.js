/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { I18nManager, AsyncStorage } from 'react-native';
import localization from './src/localization/localization';
import RootNavigator from './src/navigators/RootNavigator';
import Splash from './src/screens/Splash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchCategories } from './src/actions/categoryActions';
import { loginPass } from './src/actions/authinticationActions';

<<<<<<< HEAD
class App extends Component {
=======
import AddNewAds from './src/screens/AdvertiserNavigatorScreens/AddNewAds';
import AdvertiserAds from './src/screens/AdvertiserNavigatorScreens/AdvertiserAds';

const NavigationApp = StackNavigator({
    HomeScreen: { screen: HomeScreen }
})
  
const store = configureStore()
export default class App extends Component {
>>>>>>> 7c897666edee7751932bd489eba38ccfaeb056b5
  constructor(props){
    super(props);
    this.state = {
      rootPage: <Splash />,
      language:'ar',
      user:null,
    }
    setTimeout(
      ()=>{
        this.setState({
          rootPage: <RootNavigator />
        });
      },5000
    )
    this.checkUser = this.checkUser.bind(this);

  }

  componentWillMount(){
    this.props.fetchCategories();
    this.checkLang();
    this.checkUser();
  }

  
  async checkLang(){
    return await AsyncStorage.getItem('language').then((data)=>{
      if(data){
        console.log('lang'+data)
        // update state and use JSON.parse to convert string to object
        localization.setLanguage(data);
        if(data=='ar'){
          I18nManager.forceRTL(false);
        }else if(data=='en'){
          I18nManager.forceRTL(true);
        }
      }
      else {
        console.log('ERROR: not found')
        return null;
      }
    }).catch((error)=>{
      console.log('ERROR GET Lang: ' + error)
    });
  }

  async checkUser(){
    return await AsyncStorage.getItem('user').then(data=>JSON.parse(data)).then((data)=>{
      if(data){
        // update state and use JSON.parse to convert string to object
        console.log(data)
        this.props.loginPass(data);
        this.setState({
          rootPage: <RootNavigator />
        });
      }
      else {
        console.log('ERROR: not found')
        return null;
      }
    }).catch((error)=>{
      console.log('ERROR GET: ' + error)
    });
  }

  render() {
    return (
      this.state.rootPage   
    );
  }
}

function mapStateToProps(state) {
  return {
      ads: state.ads,
      auth: state.auth,
      categories: state.categories,
  }
}

function mapDispatchToProps(dispatch) {
  return {
      ...bindActionCreators({ fetchCategories, loginPass }, dispatch)
  }
}

<<<<<<< HEAD
export default connect(mapStateToProps, mapDispatchToProps)(App)
=======
>>>>>>> 7c897666edee7751932bd489eba38ccfaeb056b5
