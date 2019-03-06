import React from 'react'
import { StyleSheet, View, SafeAreaView, Image } from 'react-native'
import { createStackNavigator, createDrawerNavigator, DrawerItems, DrawerActions } from 'react-navigation'
import { Icon } from 'react-native-elements';
import LoginScreen from '../components/LoginScreen';
import RegisterScreen from '../components/RegisterScreen';
import FruitListScreen from '../components/FruitListScreen';
import ListItemScreen from '../components/ListItemScreen';
import CallUsScreen from '../components/CallUsScreen';
import TermsScreen from '../components/TermsScreen';
import LogoutScreen from '../components/LogoutScreen';
import SettingScreen from '../components/SettingScreen';
import MainScreen from '../components/MainScreen';



const MainNav = createStackNavigator({
    Login:{
        screen: LoginScreen
    },
    Main: {
        screen: MainScreen
    },
    Register:{
        screen: RegisterScreen
    },
    List:{
        screen: FruitListScreen
    },
    ListItem:{
        screen: ListItemScreen
    },
    callUs:{
        screen: CallUsScreen
    },
    Terms:{
        screen: TermsScreen
    },
    Setting: {
        screen: SettingScreen
    },
    Logout: {screen: LogoutScreen}
},{
   // initialRouteName: 'Register',
    
    defaultNavigationOptions: ({navigation}) => {
        return {
            headerRight: ( 
                <Icon name="menu" 
                size={34} 
                color='#fff' 
                iconStyle={{ marginRight: 15 }}
                onPress = {()=> navigation.dispatch(DrawerActions.openDrawer())}/>
            )
        }
    }
})

const CustomDrawerContentComponent = (props) => (

        <View style={styles.container}>
        <View style={{backgroundColor: 'orange', borderRadius: 95 ,marginTop:20,width:25}}>
            <Icon name="close" size= {20} 
                onPress={()=> this.props.navigation.dispatch(DrawerActions.closeDrawer())}/>
        </View>
        <View style ={{alignItems: 'center', marginTop: 80, marginBottom: 25}}>
            <Image
                source={require('../images/profile_pic.png')}
            />
        </View>
            <DrawerItems {...props} />
        </View>
    
  );
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor : '#f08619'
    },
  });

const AppNav = createDrawerNavigator({
    Home: {screen: MainNav},
    Main: {screen: MainScreen},
    Setting: {screen: SettingScreen},
    list: {screen:  FruitListScreen},
    call: {screen: CallUsScreen},
    Terms: {screen: TermsScreen},
    Logout: {screen: LogoutScreen}
},{
    drawerPosition: 'right',
    drawerWidth: 280,
    contentComponent: CustomDrawerContentComponent
})


export default (AppNav)