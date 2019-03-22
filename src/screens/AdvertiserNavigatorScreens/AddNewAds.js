import React, { Component } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Picker, Text, Image } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-picker'
import Icon from 'react-native-vector-icons/FontAwesome';

import localization from '../../localization/localization';
import Header from '../../components/Header';

import BG from '../../assets/images/bg.png';
import LO from '../../assets/images/logoR.png'
import Name from '../../assets/images/user.png';
import Phone from '../../assets/images/phone.png';
import des from '../../assets/images/des.png';
import cat from '../../assets/images/cat.png';
import ButtonBG from '../../assets/images/buttonBG.png';



class AddAds extends Component {
    state = {
        photo: null
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
            <View style={{ flex: 1 }}>
                <Image
                    source={BG}
                    style={{ width: wp('100%'), height: hp('100%'), position: 'absolute' }}
                />
                <Image source={LO} style={{ alignItems: 'center', width:wp('100%'), height:hp('95%'), position:'absolute' }} />
                {/* HEADER */}
                <Header title="اضف اعلان" />



                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:hp('5%')}}>
                    <View style={styles.inputBorder} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.userName}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="username"
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                        />
                        <Image source={Name} style={styles.image4_5}/>
                    </View>
                    <View style={styles.inputBorder} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.description}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="description"
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                        />
                        <Image source={des} style={styles.image4_5}/>
                    </View>

                    <View style={{backgroundColor:'#538805', marginBottom:hp('2%'), width:wp('80%'), justifyContent:'center', alignItems:'center', height:hp('6%'), borderRadius:wp('3.5%')}}>
                        <Icon name="arrow-down" color="white" size={wp('3%')} style={{position:'absolute', left:wp('3%')}}/>
                        <Picker
                        selectedValue={this.state.language}
                        style={{color:'white', width:wp('50%'), marginRight:wp('0%')}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({language: itemValue})
                        }>
                            <Picker.Item label={localization.category} value="choose_city" />
                            <Picker.Item label="طوخ" value="toukh" />
                        </Picker>
                        <Image source={cat} style={[styles.image4_5, {position:'absolute', right:wp('3%')}]}/>
                    </View>

                    <View style={[styles.inputBorder, {marginBottom:0}]} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.phoneNumber}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="phoneNumber"
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                        />
                        <Image source={Phone} style={styles.image4_5}/>
                    </View>

                    <View>
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: hp('0%') }}>
                            {photo ? <Image
                                source={{ uri: photo.uri }}
                                style={{ width: 100, height: 100 }}
                            /> : null}
                        </View>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', width: wp('30%'), height: hp('6%'), backgroundColor: '#538805', borderRadius: wp('3%'), marginTop: hp('5%'), alignItems: 'center', justifyContent: 'center' }}
                            onPress={this.handleImagePicker}
                        >

                            <Text style={{ textAlign: 'center', color: 'white', fontSize: wp('4%'), fontWeight: 'bold', marginRight: wp('2%') }}>
                                {localization.addImage}
                            </Text>
                            <Icon name="image" size={wp('4%')} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View style={{justifyContent:'flex-start', alignItems:'center', marginTop:hp('10%')}}>
                        <TouchableOpacity style={{justifyContent:'center', alignItems:'center', width:wp('40%'), height:hp('7%')}}>
                            <Image source={ButtonBG} style={{width:wp('40%'), height:hp('7%'), right:wp('0%'), top:hp('0%'), resizeMode:'contain', justifyContent:'center', position:'absolute'}}/>
                            <View>
                                <Text style={styles.buttonText}> {localization.next} </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    image4_5:{
        width:wp('4.5%'), 
        height:wp('4.5%'), 
        resizeMode:'contain'
    },
    logo:{
        width:wp('25%'), 
        height:hp('15%'), 
        margin:wp('3%'),
        resizeMode:'contain'
    },
    inputBorder:{
        backgroundColor:'rgba(255, 255, 255, 0.8)', 
        flexDirection:'row', 
        justifyContent:'center', 
        alignItems:'center', 
        borderWidth:wp('0.2%'), 
        borderRadius:wp('4%'), 
        borderColor:'#538805', 
        marginBottom:hp('1.5%'), 
        paddingHorizontal:wp('2%')
    },
    textInput:{
        width:wp('70%'), 
        padding:0, 
        height:hp('5.8%'), 
        paddingHorizontal:wp('2%'), 
        fontSize:wp('4%'), 
        fontWeight:'600', 
        color:'#A3A3A3'
    },
    buttonText:{
        color:'white', 
        textAlign:'center', 
        fontSize:wp('4.5%'), 
        fontWeight:'600'
    },
    pageBG:{
        flex: 1,
        resizeMode: 'stretch',
    }
})

export default AddAds