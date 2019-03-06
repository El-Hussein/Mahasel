import React , { Component } from 'react'
import { View, Text } from 'react-native'

class SettingScreen extends Component {
    static navigationOptions = () => ({
        title: 'الاعدادات',
        headerStyle: {
            backgroundColor: '#74b245'
        },
        headerTintColor: 'white',
    })
    render(){
        return(
            <View>
                <Text>Setting Screen</Text>
            </View>
        )
    }
}

export default SettingScreen;