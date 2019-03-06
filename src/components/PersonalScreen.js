import React , { Component } from 'react'
import { View, Text } from 'react-native'

class PersonalScreen extends Component {
    static navigationOptions = () => ({
        title: 'الشخصيه',
        headerStyle: {
            backgroundColor: '#74b245'
        },
        headerTintColor: 'white',
    })
    render(){
        return(
            <View>
                <Text>Personal Screen</Text>
            </View>
        )
    }
}

export default PersonalScreen;