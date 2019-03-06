import React, { Component } from 'react'
import { TextInput, StyleSheet, View, Image, ImageBackground, Text, StatusBar } from 'react-native'
import { Button } from 'native-base'


class RegisterScreen extends Component {
    static navigationOptions = () => ({
        title: 'تسجيل الدخول',
        headerStyle: {
            backgroundColor: '#74b245'
          },
          headerTintColor: 'white',
    })
    render() {
        return (
            <ImageBackground
                source={require('../images/register_background.png')}
                style={styles.backgroundImageStyle}
            >
            <StatusBar
                backgroundColor="#54872d"
            />
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
                            placeholder=" البريد الالكترونى "
                            placeholderTextColor='green'
                        />
                           <TextInput
                            style={styles.textInputStyle}
                            placeholder="البلد"
                            placeholderTextColor='green'
                        />
                        <TextInput
                            style={styles.textInputStyle}
                            placeholder="المدينه"
                            placeholderTextColor='green'
                        />
                           <TextInput
                            style={styles.textInputStyle}
                            placeholder="رقم الهاتف"
                            placeholderTextColor='green'
                        />
                        <TextInput
                            style={styles.textInputStyle}
                            placeholder="كلمه المرور"
                            placeholderTextColor='green'
                        />
                           <TextInput
                            style={styles.textInputStyle}
                            placeholder="تأكيد كلمه المرور"
                            placeholderTextColor='green'
                        />
                        
                        <Button 
                            rounded 
                            style={styles.buttonStyle}
                            onPress = {() => this.props.navigation.navigate('Main') }>
                            <Text style={{ textAlign: 'center', color: '#fff', marginLeft: 50, fontSize: 20 }}>التالى </Text>
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
    backgroundImageStyle: {
        flex: 1,
        height: '100%'
    },
    logoView: {
        alignItems: 'center',
        marginVertical: 10
    },
    logo: {
        width: 90,
        height: 95,
    },
    textInputViewStyle: {
        flex: 1,
        alignItems: 'center'
    },
    textInputStyle: {
        width: '80%',
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 20,
        backgroundColor: '#fff',
        marginTop: 10,

    },
    buttonStyle: {
        width: 150,
        backgroundColor: '#db372b',
        marginTop: 10,
        alignSelf: 'center'
    }
})

export default RegisterScreen