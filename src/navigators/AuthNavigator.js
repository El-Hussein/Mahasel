// Auth nav with 2 pages sign in and register

import { createStackNavigator } from 'react-navigation';

import SignIn from '../screens/AuthScreens/Signin';
import Register from '../screens/AuthScreens/Register';


export default AuthNavigator = createStackNavigator(
    {
        SignIn: {
            screen: SignIn,
            navigationOption:{
                title:"SignIn", 
            }
        },
        Register: {
            screen: Register,
            navigationOption:{
                title:"Register",
                header: null, 
            }
        },
    },
    {
        navigationOptions:{
            header: null,
        }
    }
)