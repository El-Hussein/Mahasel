import React , { Component } from 'react'
import { View, Text } from 'react-native'

class LogoutScreen extends Component {
    static navigationOptions = () => ({
        title: 'الخروج',
        headerStyle: {
            backgroundColor: '#74b245'
        },
        headerTintColor: 'white',
    })
    render(){
        return(
            <View>
                <Text>Logout Screen</Text>
            </View>
        )
    }
}

export default LogoutScreen;