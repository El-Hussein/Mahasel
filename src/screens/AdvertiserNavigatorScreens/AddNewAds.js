import React, { Component } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Picker, Text, Image, ScrollView } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import PhotoUpload from 'react-native-photo-upload';
import ImagePicker from 'react-native-image-picker';

import Icon from 'react-native-vector-icons/FontAwesome';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import localization from '../../localization/localization';
import { addingAdvertiser } from '../../actions/advertiserActions';

import BG from '../../assets/images/bg.png';
import LO from '../../assets/images/logoR.png'
import Name from '../../assets/images/user.png';
import Phone from '../../assets/images/phone.png';
import des from '../../assets/images/des.png';
import cat from '../../assets/images/cat.png';
import ButtonBG from '../../assets/images/buttonBG.png';

import Toast, {DURATION} from 'react-native-easy-toast'


class AddAds extends Component {
    constructor(){
        super()
        this.state = {
            photo: null,
            ImageSource: null,
            data: null,
        
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validate(){
        error = false;
        if(!this.state.name){
            this.setState({
                nameError:true
            })
            error = true;
        }else{
            this.setState({
                nameError:false
            })
        }
        if(!this.state.phone){
            this.setState({
                phoneError:true
            })
            error = true;
        }else{
            this.setState({
                phoneError:false
            })
        }
        if(!this.state.price){
            this.setState({
                priceError:true
            })
            error = true;
        }else{
            this.setState({
                priceError:false
            })
        }
        if(!this.state.quantity){
            this.setState({
                quantityError:true
            })
            error = true;
        }else{
            this.setState({
                quantityError:false
            })
        }
        if(!this.state.des){
            this.setState({
                desError:true
            })
            error = true;
        }else{
            this.setState({
                desError:false
            })
        }
        if(this.state.cat == '0'){
            this.setState({
                catError:true
            })
            error = true;
        }else{
            this.setState({
                catError:false
            })
        }
        if(!this.state.ImageSource){
            this.setState({
                ImageSourceError:true
            })
            error = true;
        }else{
            this.setState({
                ImageSourceError:false
            })
        }
        return error;
    }

    clearAdsForm(){
        this.setState({
            name:null,
            des:null,
            cat_id:'0',
            price:null,
            quantity:null,
            phone:null,
            ImageSource:null,
        })
    }
    
    handleSubmit(){     
        if(this.validate()) return; 
        data = {
            name:this.state.name,
            des:this.state.des,
            cat_id:this.state.cat_id,
            price:this.state.price,
            quantity:this.state.quantity,
            phone:this.state.phone,
            image:this.state.ImageSource.uri,
            token:this.props.auth.userToken
        }        

        // console.warn(data);
        this.props.addingAdvertiser(data);
        if(!this.props.ads.error){
            this.refs.toast.show(localization.added);
            this.clearAdsForm();
            // this.props.navigation.navigate('Home');
        }
    }

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };
    
        ImagePicker.showImagePicker(options, (response) => {
        // console.log('Response = ', response);
    
        if (response.didCancel) {
            // console.log('User cancelled photo picker');
        }
        else if (response.error) {
            // console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
            // console.log('User tapped custom button: ', response.customButton);
        }
        else {
            let source = { uri: response.uri };
    
            this.setState({
    
            ImageSource: source,
            data: response.data
    
            });
        }
        });
    }

    renderPickerItem(){
        return this.props.categories.categories.map( (category, i) => {
            return <Picker.Item key={i} value={category.id} label={category.name} />
        });
    }

    render() {
        const { ImageSource } = this.state
        return (
            <View style={{ flex: 1 }}>
                
                <Image
                    source={BG}
                    style={{ width: wp('100%'), height: hp('100%'), position: 'absolute' }}
                />
                <Image source={LO} style={{ alignItems: 'center', width:wp('100%'), height:hp('95%'), position:'absolute' }} />
                {/* HEADER */}
                <Header title={localization.addAds} />

                
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                {this.props.ads.error?<Text style={{color:'red', textAlign:'center', textAlignVertical:'center', marginBottom:wp('1%'), fontSize:wp('4%')}}>{this.props.ads.error}</Text>:null}
                <ScrollView style={{height:hp('60%'), marginTop:hp('18%')}}>
                    {this.state.nameError?<Text style={{color:'red', textAlign:'center', textAlignVertical:'center', marginBottom:wp('1%'), fontSize:wp('4%')}}>{localization.nameError}</Text>:null}
                    <View style={styles.inputBorder} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.adsName}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="ads"
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                            onChangeText={(name) => this.setState({name})}
                            value={this.state.name}
                        />
                        <Image source={Name} style={styles.image4_5}/>
                    </View>
                    
                    {this.state.desError?<Text style={{color:'red', textAlign:'center', textAlignVertical:'center', marginBottom:wp('1%'), fontSize:wp('4%')}}>{localization.desError}</Text>:null}
                    <View style={styles.inputBorder} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.description}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="description"
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                            onChangeText={(des) => this.setState({des})}
                            value={this.state.des}
                        />
                        <Image source={des} style={styles.image4_5}/>
                    </View>
                    {this.state.catError?<Text style={{color:'red', textAlign:'center', textAlignVertical:'center', marginBottom:wp('1%'), fontSize:wp('4%')}}>{localization.catError}</Text>:null}
                    <View style={{backgroundColor:'#538805', marginBottom:hp('2%'), width:wp('80%'), justifyContent:'center', alignItems:'center', height:hp('6%'), borderRadius:wp('3.5%')}}>
                        <Icon name="arrow-down" color="white" size={wp('3%')} style={{position:'absolute', left:wp('3%')}}/>
                        <Picker
                        selectedValue={this.state.cat_id}
                        style={{color:'white', width:wp('50%'), marginRight:wp('0%')}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({cat_id: itemValue})
                        }>
                            <Picker.Item label={localization.category} value="0" />
                            {this.renderPickerItem()}
                        </Picker>
                        <Image source={cat} style={[styles.image4_5, {position:'absolute', right:wp('3%')}]}/>
                    </View>
                    {this.state.phoneError?<Text style={{color:'red', textAlign:'center', textAlignVertical:'center', marginBottom:wp('1%'), fontSize:wp('4%')}}>{localization.phoneError}</Text>:null}

                    <View style={[styles.inputBorder, {}]} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.phoneNumber}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="phone"
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                            onChangeText={(phone) => this.setState({phone})}
                            value={this.state.phone}
                        />
                        <Image source={Phone} style={styles.image4_5}/>
                    </View>
                    {this.state.quantityError?<Text style={{color:'red', textAlign:'center', textAlignVertical:'center', marginBottom:wp('1%'), fontSize:wp('4%')}}>{localization.quantityError}</Text>:null}

                    <View style={[styles.inputBorder, {}]} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.quantity}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="quantity"
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                            onChangeText={(quantity) => this.setState({quantity})}
                            value={this.state.quality}
                        />
                        <Image source={Phone} style={styles.image4_5}/>
                    </View>
                    {this.state.priceError?<Text style={{color:'red', textAlign:'center', textAlignVertical:'center', marginBottom:wp('1%'), fontSize:wp('4%')}}>{localization.priceError}</Text>:null}

                    <View style={[styles.inputBorder, {}]} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.price}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="price"
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                            onChangeText={(price) => this.setState({price})}
                            value={this.state.price}
                        />
                        <Image source={Phone} style={styles.image4_5}/>
                    </View>
                    {this.state.photoError?<Text style={{color:'red', textAlign:'center', textAlignVertical:'center', marginBottom:wp('1%'), fontSize:wp('4%')}}>{localization.selectImage}</Text>:null}

                    {/* image upload */}
                    <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}} onPress={this.selectPhotoTapped.bind(this)}>
 
                        <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                            {ImageSource ? <Image
                                source={this.state.ImageSource}
                                style={{ width: wp('20%'), height: wp('20%'), marginBottom:hp('1%'), borderRadius:wp('10%'), borderWidth:wp('0.5%'), borderColor:'white' }}
                            /> : null}
                        </View>
                        <View style={{ flexDirection: 'row', width: wp('30%'), height: hp('6%'), backgroundColor: '#538805', borderRadius: wp('3%'), marginVertical: hp('2%'), alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center', color: 'white', fontSize: wp('4%'), fontWeight: 'bold', marginRight: wp('2%') }}>
                                {localization.addImage}
                            </Text>
                            <Icon name="image" size={wp('4%')} color="white" />
                        </View>
                
                    </TouchableOpacity>

                    </ScrollView>
                    <View style={{justifyContent:'flex-start', alignItems:'center', marginTop:hp('2%')}}>
                        <TouchableOpacity onPress={()=>{
                            this.handleSubmit()}} style={{justifyContent:'center', alignItems:'center', width:wp('40%'), height:hp('7%')}}>
                            <Image source={ButtonBG} style={{width:wp('40%'), height:hp('7%'), right:wp('0%'), top:hp('0%'), resizeMode:'contain', justifyContent:'center', position:'absolute'}}/>
                            <View>
                                <Text style={styles.buttonText}> {localization.next} </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <Toast ref="toast"/>
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

function mapStateToProps(state) {
    return {
        ads: state.ads,
        auth: state.auth,
        categories: state.category,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ addingAdvertiser }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAds)