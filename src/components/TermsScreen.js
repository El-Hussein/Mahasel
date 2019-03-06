import React , { Component } from 'react'
import { View, Image, TextInput, ImageBackground, StyleSheet, StatusBar, Text } from 'react-native'
import { Header, Title, Left, Button, Body, Right } from 'native-base'
import { Icon } from 'react-native-elements';


class TermsScreen extends Component{
    static navigationOptions = () => ({
        title: 'الشروط و الاحكام',
        headerStyle: {
            backgroundColor: '#74b245'
        },
        headerTintColor: 'white',
    })
    render(){
        return(
            <ImageBackground
                source={require('../images/termsBackground.png')}
                style={styles.backgroundImageStyle}
            >
                <View style={styles.container}>
                {/* <View>
                    <Header style={styles.header}>
                        <StatusBar backgroundColor="#3c7a24" />
                        <Left>
                            <Button
                                transparent
                                onPress={() => this.props.navigation.goBack()}
                            >
                                <Icon name='arrow-back' iconStyle={{ marginRight: 15 }} color='#fff' />
                            </Button>
                        </Left>
                        <Body>
                            <Title> الشروط و الأحكام</Title>
                        </Body>
                    </Header>
                </View> */}
                    <View style={styles.logoView}>
                        <Image
                            source={require('../images/registerLogo.png')}
                            style={styles.logo}
                        />
                    </View>
                    <View style={styles.textInputViewStyle}>
                         <TextInput
                            style={styles.msgTextStyle}
                        />
                        <Button 
                            rounded 
                            style={styles.buttonStyle}
                            onPress = {() => this.props.navigation.navigate('List') }>
                            <Text style={{ textAlign: 'center', color: '#fff', marginLeft: 50, fontSize: 20 }}>موافق </Text>
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
        marginVertical: 30
    },
    logo: {
        width: 90,
        height: 95,
    },
    textInputViewStyle: {
        flex: 1,
        alignItems: 'center',
    },
    msgTextStyle:{
        width: '80%',
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.6)',
        marginTop: 10,
        height: 350
    },
    buttonStyle: {
        width: 150,
        backgroundColor: '#db372b',
        marginTop: 10,
        alignSelf: 'center'
    }
})

export default TermsScreen