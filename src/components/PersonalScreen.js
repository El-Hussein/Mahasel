import React, { Component } from 'react'
import { View, Text, Image, Picker, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { Avatar } from 'react-native-elements'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';

import ImagePicker from 'react-native-image-picker'
import Header from './Header'
import localization from '../localization/localization'
import Icon from 'react-native-vector-icons/FontAwesome';
import Name from '../assets/images/user.png'
import PRImage from '../assets/images/defaultProfileImage.png'
import ED from '../assets/images/editPhoto.png'
import cat from '../assets/images/cat.png';
import LAN from '../assets/images/country.png'
import EMAIL from '../assets/images/email.png'
import PH from '../assets/images/phone.png'
import ButtonBG from '../assets/images/buttonBG.png'
import ProfileDefault from '../assets/images/profile_pic.png';



class PersonalScreen extends Component {
    static navigationOptions = () => ({
        title: 'الشخصيه',
        headerStyle: {
            backgroundColor: '#74b245'
        },
        headerTintColor: 'white',
    })

    state = {
        photo: null,
        editable: false
    }

    handleImagePicker = () => {
        const options = {}
        ImagePicker.showImagePicker(options, response => {
            console.log('response', response)
            if (response.uri) {
                this.setState({
                    photo: response
                })
            }

        })
    }
    render() {
        const { photo } = this.state
        return (
            // <ImageBackground
            //     source={BG}
            //     style={{ width: '100%', height: '100%', position: 'absolute' }}
            // >
                <View style={{flex: 1}}>
                {/* <Header title={localization.profile} backScreen="SignIn"/> */}
                    <View style={{ alignItems: 'center' }}>
                        {/* {photo ?   */}
                             <View style={{height:hp('34.5%'), width:wp('85%'), justifyContent:'center', alignItems:'center'}}>
                                        <Image source={ProfileDefault} style={{width:wp('24%'), borderWidth:wp('0.8%'), borderColor:'white', height:wp('24%'), borderRadius:wp('9%'), backgroundColor:'red', marginBottom:wp('1%')}}/>
                                        <Text style={{fontWeight:'bold', fontSize:wp('4.2%'), color:'#242424'}}> محمد عبدالله إبراهيم </Text>
                                        <Text style={{fontWeight:'bold', fontSize:wp('4.2%'), color:'#242424'}}> شارع الرياض في وسط المدينه </Text>
                                    </View>
                            {/* :
                            <Avatar
                                source={PRImage}
                                xlarge
                                onPress={this.handleImagePicker}
                                rounded
                            />} */}

                    </View>
                    

                    <View style={{ marginHorizontal: wp('10%') }}>
                        <View style={styles.inputBorder} >
                            <Image source={Name} style={[styles.image4_5, { marginLeft: wp('4%') }]} />
                            <TextInput
                                style={styles.textInput}
                                placeholder={localization.userName}
                                autoCorrect={false}
                                returnKeyType="next"
                                ref="username"
                                placeholderTextColor="#A3A3A3"
                                underlineColorAndroid="transparent"
                                editable= {this.state.editable}
                            />
                             <TouchableOpacity onPress={() => this.setState({
                                        editable: !this.state.editable
                                    })}
                                    style={{marginLeft: -30}}
                                    >
                                <Image
                                    source={ED}
                                    style={{ width: wp('4%'), height: hp('2%') }}
                                />
                            </TouchableOpacity>
                        </View>
                        
                        <View style={[styles.inputBorder, {backgroundColor:'#538805'}]}>
                        <Icon name="arrow-down" color="white" size={wp('3%')} style={{position:'absolute', left:wp('3%')}}/>
                        <Picker
                        selectedValue={this.state.language}
                        style={{color:'white', width:wp('50%'), marginRight:wp('0%')}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({language: itemValue})
                        }>
                            <Picker.Item label={localization.language} value="choose_language" />
                            <Picker.Item label="العربيه" value="arabic" />
                        </Picker>
                        <Image source={cat} style={[styles.image4_5, {position:'absolute', right:wp('3%')}]}/>
                    </View>

                        <View style={styles.inputBorder} >
                            <Image source={LAN} style={[styles.image4_5, { marginLeft: wp('4%') }]} />
                            <TextInput
                                style={styles.textInput}
                                placeholder={localization.language}
                                autoCorrect={false}
                                returnKeyType="next"
                                ref="language"
                                placeholderTextColor="#A3A3A3"
                                underlineColorAndroid="transparent"
                                editable= {this.state.editable}
                                />
                              <TouchableOpacity onPress={() => this.setState({
                                        editable: !this.state.editable
                                    })}
                                    style={{marginLeft: -30}}
                                    >
                                <Image
                                    source={ED}
                                    style={{ width: wp('4%'), height: hp('2%') }}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputBorder} >
                            <Image source={EMAIL} style={[styles.image4_5, { marginLeft: wp('4%') }]} />
                            <TextInput
                                style={styles.textInput}
                                placeholder={localization.email}
                                autoCorrect={false}
                                returnKeyType="next"
                                ref="username"
                                placeholderTextColor="#A3A3A3"
                                underlineColorAndroid="transparent"
                                editable= {this.state.editable}
                            />
                            <TouchableOpacity onPress={() => this.setState({
                                        editable: !this.state.editable
                                    })}
                                    style={{marginLeft: -30}}
                                    >
                                <Image
                                    source={ED}
                                    style={{ width: wp('4%'), height: hp('2%') }}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputBorder} >
                            <Image source={PH} style={[styles.image4_5, { marginLeft: wp('4%') }]} />
                            <TextInput
                                style={styles.textInput}
                                placeholder={localization.phoneNumber}
                                autoCorrect={false}
                                returnKeyType="next"
                                ref="username"
                                placeholderTextColor="#A3A3A3"
                                underlineColorAndroid="transparent"
                                editable= {this.state.editable}
                            />
                              <TouchableOpacity onPress={() => this.setState({
                                        editable: !this.state.editable
                                    })}
                                    style={{marginLeft: -30}}
                                    >
                                <Image
                                    source={ED}
                                    style={{ width: wp('4%'), height: hp('2%') }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: wp('40%'), height: hp('7%') }}>
                            <Image source={ButtonBG} style={{ width: wp('40%'), height: hp('7%'), right: wp('0%'), top: hp('0%'), resizeMode: 'contain', justifyContent: 'center', position: 'absolute' }} />
                            <View>
                                <Text style={styles.buttonText}> {localization.save} </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            // </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    image4_5: {
        width: wp('5.5%'),
        height: wp('5.5%'),
        resizeMode: 'contain',
    },
    inputBorder: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: wp('0.2%'),
        borderRadius: wp('4%'),
        borderColor: '#538805',
        marginBottom: hp('1.5%'),
        marginTop: hp('1.5%'),
        paddingHorizontal: wp('2%')
    },
    textInput: {
        width: wp('70%'),
        padding: 0,
        height: hp('5.8%'),
        paddingHorizontal: wp('2%'),
        fontSize: wp('4%'),
        fontWeight: '600',
        color: '#A3A3A3'
    },
    buttonText:{
        color:'white', 
        textAlign:'center', 
        fontSize:wp('4.5%'), 
        fontWeight:'600'
    },
});
export default PersonalScreen;