import React, { Component } from 'react'
import { TextInput, StyleSheet, View, Image, ImageBackground, Text,StatusBar } from 'react-native'
import { Button } from 'native-base'
import { SocialIcon, Icon } from 'react-native-elements'



class LoginScreen extends Component {
    static navigationOptions = ({navigation}) => ({
        header: null,
        drawerIcon: () => (
            <Icon name="search" size={15} />
        )
    })
    render() {
        return (
            <ImageBackground
                source={require('../images/login_background.png')}
                style={styles.backgroundImageStyle}
            >
            <StatusBar backgroundColor="#3c7a24"/>
                <View style={styles.container}>
                    <View style={styles.logoView}>
                        <Image
                            source={require('../images/logo.png')}
                            style={styles.logo}
                        />
                    </View>
                    <View style={styles.textInputViewStyle}>
                        <TextInput
                            style={styles.textInputStyle}
                            placeholder="رقم الهاتف"
                            placeholderTextColor='green'
                        />
                        <TextInput
                            style={styles.textInputStyle}
                            placeholder=" كلمه المرور"
                            placeholderTextColor='green'
                        />
                        <Button 
                            rounded 
                            style={styles.buttonStyle}
                            onPress = {() => this.props.navigation.navigate('Register') }>
                            <Text style={{ textAlign: 'center', color: '#fff', marginLeft: 40 }}>تسجيل الدخول</Text>
                        </Button>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Button rounded style={{ backgroundColor: '#0e4772', width: 150, margin: 5 }}>
                                <Text style={{ textAlign: 'center', color: '#fff', marginLeft: 40 }}> تخطى التسجيل</Text>
                            </Button>
                            <Button rounded style={{ backgroundColor: '#0e4772', width: 150, margin: 5 }}>
                                <Text style={{ textAlign: 'center', color: '#fff', marginLeft: 40 }}> عضو جديد</Text>
                            </Button>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <SocialIcon
                                type="twitter"
                            />
                            <SocialIcon
                                type="facebook"
                            />
                            
                        </View>
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
        width: 150,
        height: 170,
    },
    textInputViewStyle: {
        flex: 1,
        alignItems: 'center',
        marginTop: 40
    },
    textInputStyle: {
        width: '80%',
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 20,
        backgroundColor: '#fff',
        marginTop: 10

    },
    buttonStyle: {
        width: 150,
        backgroundColor: '#db372b',
        marginTop: 10,
        alignSelf: 'center'
    }
})

export default LoginScreen