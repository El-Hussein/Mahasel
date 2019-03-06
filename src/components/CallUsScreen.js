import React , { Component } from 'react'
import { View, Image, TextInput, ImageBackground, StyleSheet, StatusBar, Text } from 'react-native'
import { Header, Title, Left, Button, Body, Right } from 'native-base'
import { Icon } from 'react-native-elements';


class CallUsScreen extends Component{
    static navigationOptions = () => ({
        title: 'اتصل بنا ',
        headerStyle: {
            backgroundColor: '#74b245'
          },
          headerTintColor: 'white',
    })
    render(){
        return(
            <ImageBackground
                source={require('../images/callUsBackground.png')}
                style={styles.backgroundImageStyle}
            >
                <View style={styles.container}>
              
                    <View style={styles.logoView}>
                        <Image
                            source={require('../images/registerLogo.png')}
                            style={styles.logo}
                        />
                    </View>
                    <View style={styles.textInputViewStyle}>
                    <TextInput
                            style={styles.textInputStyle}
                            placeholder="الاسم "
                            placeholderTextColor='green'
                        />
                         <TextInput
                            style={styles.textInputStyle}
                            placeholder="رقم الهاتف "
                            placeholderTextColor='green'
                        />
                         <TextInput
                            style={styles.msgTextStyle}
                            placeholder="الرساله "
                            placeholderTextColor='green'
                        />
                        <Button 
                            rounded 
                            style={styles.buttonStyle}
                            onPress = {() => this.props.navigation.navigate('Terms') }>
                            <Text style={{ textAlign: 'center', color: '#fff', marginLeft: 50, fontSize: 20 }}>ارسال </Text>
                        </Button>
                </View>
                </View>

                
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        backgroundColor: '#74b245'
    },
    backgroundImageStyle: {
        flex: 1,
        height: '100%'
    },
    logoView: {
        alignItems: 'center',
        marginVertical: 80
    },
    logo: {
        width: 90,
        height: 95,
    },
    textInputViewStyle: {
        flex: 1,
        alignItems: 'center',
        //marginTop: 20
    },
    textInputStyle: {
        width: '80%',
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 20,
        backgroundColor: '#fff',
        marginTop: 10
        
    },
    msgTextStyle:{
        width: '80%',
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.6)',
        marginTop: 10,
        height: 150
    },
    buttonStyle: {
        width: 150,
        backgroundColor: '#db372b',
        marginTop: 10,
        alignSelf: 'center'
    }
})

export default CallUsScreen