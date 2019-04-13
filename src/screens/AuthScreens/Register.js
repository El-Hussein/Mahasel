import React, {Component} from 'react'
import {
    View,
    Text,
    ImageBackground,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Picker
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import PhotoUpload from 'react-native-photo-upload';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchCities } from '../../actions/locationActions';

import Header from '../../components/Header';
import localization from '../../localization/localization';
import { register } from '../../actions/authinticationActions';
import Toast, {DURATION} from 'react-native-easy-toast'

import BG from '../../assets/images/bg.png';
import Logo from '../../assets/images/registerLogo.png';
import Name from '../../assets/images/user.png';
import Email from '../../assets/images/email.png';
import Country from '../../assets/images/country.png';
import City from '../../assets/images/city.png';
import Phone from '../../assets/images/phone.png';
import Lock from '../../assets/images/lock.png';
import ButtonBG from '../../assets/images/buttonBG.png';
 
class Register extends Component{

    constructor(props) {
        super()
        this.handleRegister = this.handleRegister.bind(this);
        this.state = {
            username:'',
            usernameError:false,
            email:'',
            emailError:false,
            phone:'',
            phoneError:false,
            country:'',
            countryError:false,
            city:'',
            cityError:false,
            address:'',
            addressError:false,
            password:'',
            passwordError:false,
            passwordConfirm:'',
            passwordConfirmError:false,
            photo:null,
            photoError:false,
            passwordMatch:null,
        }
    }
 
    validate(){
        error = false;
        if(!this.state.username){
            this.setState({
                usernameError:true
            })
            error = true;
        }else{
            this.setState({
                usernameError:false
            })
        }
        if(!this.state.email){
            this.setState({
                emailError:true
            })
            error = true;
        }else{
            this.setState({
                emailError:false
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
        if(!this.state.country){
            this.setState({
                countryError:true
            })
            error = true;
        }else{
            this.setState({
                countryError:false
            })
        }
        if(!this.state.city){
            this.setState({
                cityError:true
            })
            error = true;
        }else{
            this.setState({
                cityError:false
            })
        }
        if(!this.state.address){
            this.setState({
                addressError:true
            })
            error = true;
        }else{
            this.setState({
                addressError:false
            })
        }
        if(!this.state.password){
            this.setState({
                passwordError:true
            })
            error = true;
        }else{
            this.setState({
                passwordError:false
            })
        }
        if(!this.state.passwordConfirm){
            this.setState({
                passwordConfirmError:true
            })
            error = true;
        }else{
            this.setState({
                passwordConfirmError:false
            })
        }
        if(!this.state.ImageSource){
            this.setState({
                photoError:true
            })
            error = true;
        }else{
            this.setState({
                photoError:false
            })
        }
        if(this.state.password !== this.state.passwordConfirm){
            this.setState({
                passwordMatch:localization.confirmPasswordError
            })
            error = true;
        }else{
            this.setState({
                passwordMatch:null
            })
        }
        return error;
    }

    clearAdsForm(){
        this.setState({
            username:null,
            email:null,
            phone:null,
            country:'0',
            cities:'0',
            address:null,
            password:null,
            passwordConfirm:null,
            photo:null,
        })
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
        console.log('Response = ', response);
    
        if (response.didCancel) {
            console.log('User cancelled photo picker');
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
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
    
    handleRegister(){
        if(this.validate()) return;
        data = {
            name:this.state.username,
            email:this.state.email,
            phone:this.state.phone,
            password:this.state.password,
            country:this.state.country,
            city:this.state.city+'kkkkkk',
            address:this.state.address,
            image:this.state.ImageSource.uri,
        }
        this.props.register(data);  
        console.warn(this.props.auth)      
    }

    renderPickerCountryItem(){
        return this.props.location.countries.map( (country, i) => {
            return <Picker.Item key={i} value={country.id} label={country.name} />
        });
    }
    renderPickerCityItem(){
        return this.props.location.cities.map( (city, i) => {
            return <Picker.Item key={i} value={city.id} label={city.name} />
        });
    }

    render () {
        const { ImageSource } = this.state
        if(this.props.auth.userToken != null){
            this.refs.toast.show(localization.registered);
            this.props.navigation.navigate('Home');
        }
        return (
            <ImageBackground source={BG}  style={styles.pageBG}>
                {/* HEADER */}
                <Header title={localization.register} drawer="stop"/>
                <ScrollView style={{height:hp('90%')}}>
                
                
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <Image source={Logo} style={styles.logo}/>
                </View>

                <View style={{marginHorizontal:wp('10%')}}>
                    {this.props.auth.error?<Text style={{color:'red', textAlign:'center', textAlignVertical:'center', marginBottom:wp('1%'), fontSize:wp('4%')}}>{this.props.auth.error}</Text>:null}
                    {this.state.usernameError?<Text style={{color:'red', textAlign:'center', textAlignVertical:'center', marginBottom:wp('1%'), fontSize:wp('4%')}}>{localization.usernameError}</Text>:null}
                    <View style={styles.inputBorder} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.userName}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="username"
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                            onChangeText={(username) => this.setState({username})}
                        />
                        <Image source={Name} style={styles.image4_5}/>
                    </View>
                    {this.state.emailError?<Text style={{color:'red', textAlign:'center', textAlignVertical:'center', marginBottom:wp('1%'), fontSize:wp('4%')}}>{localization.emailError}</Text>:null}
                    <View style={styles.inputBorder} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.email}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="email"
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                            onChangeText={(email) => this.setState({email})}
                        />
                        <Image source={Email} style={styles.image4_5}/>
                    </View>
                    
                    {this.state.countryError?<Text style={{color:'red', textAlign:'center', textAlignVertical:'center', marginBottom:wp('1%'), fontSize:wp('4%')}}>{localization.countryError}</Text>:null}
                    <View style={{backgroundColor:'#538805', marginBottom:hp('2%'), width:wp('80%'), justifyContent:'center', alignItems:'center', height:hp('6%'), borderRadius:wp('3.5%')}}>
                        <Icon name="arrow-down" color="white" size={wp('3%')} style={{position:'absolute', left:wp('3%')}}/>
                        <Picker
                        selectedValue={this.state.country}
                        style={{color:'white', width:wp('50%'), marginRight:wp('0%')}}
                        onValueChange={(itemValue, itemIndex) =>{
                            console.warn(itemValue)
                            this.props.fetchCities(itemValue);
                            this.setState({country: itemValue})
                        }}>
                            <Picker.Item label={localization.country} value="0" />
                            {this.props.location.countries?this.renderPickerCountryItem():<Picker.Item label=" "/>}
                        </Picker>
                        <Image source={Country} style={[styles.image4_5, {position:'absolute', right:wp('3%')}]}/>
                    </View>

                    {this.state.cityError?<Text style={{color:'red', textAlign:'center', textAlignVertical:'center', marginBottom:wp('1%'), fontSize:wp('4%')}}>{localization.cityError}</Text>:null}
                    <View style={{backgroundColor:'#538805', marginBottom:hp('2%'), width:wp('80%'), justifyContent:'center', alignItems:'center', height:hp('6%'), borderRadius:wp('3.5%')}}>
                        <Icon name="arrow-down" color="white" size={wp('3%')} style={{position:'absolute', left:wp('3%')}}/>
                        <Picker
                        selectedValue={this.state.city}
                        style={{color:'white', width:wp('50%'), marginRight:wp('0%')}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({city: itemValue})
                        }>
                            <Picker.Item label={localization.city} value="0" />
                            {this.props.location.cities?this.renderPickerCityItem():<Picker.Item label=" "/>}
                        </Picker>
                        <Image source={City} style={[styles.image4_5, {position:'absolute', right:wp('3%')}]}/>
                    </View>

                    {this.state.addressError?<Text style={{color:'red', textAlign:'center', textAlignVertical:'center', marginBottom:wp('1%'), fontSize:wp('4%')}}>{localization.addressError}</Text>:null}
                    <View style={styles.inputBorder} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.address}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="address"
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                            onChangeText={(address) => this.setState({address})}
                        />
                        <Image source={City} style={styles.image4_5}/>
                    </View>
                    {this.state.phoneError?<Text style={{color:'red', textAlign:'center', textAlignVertical:'center', marginBottom:wp('1%'), fontSize:wp('4%')}}>{localization.phoneError}</Text>:null}
                    <View style={styles.inputBorder} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.phoneNumber}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="phone"
                            keyboardType='numeric'
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                            onChangeText={(phone) => this.setState({phone})}
                        />
                        <Image source={Phone} style={styles.image4_5}/>
                    </View>
                    {this.state.passwordError?<Text style={{color:'red', textAlign:'center', textAlignVertical:'center', marginBottom:wp('1%'), fontSize:wp('4%')}}>{localization.passwordError}</Text>:null}
                    <View style={styles.inputBorder} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.password}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="password"
                            secureTextEntry={true}
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                            onChangeText={(password) => this.setState({password})}
                        />
                        <Image source={Lock} style={styles.image4_5}/>
                    </View>
                    {this.state.passwordConfirmError?<Text style={{color:'red', textAlign:'center', textAlignVertical:'center', marginBottom:wp('1%'), fontSize:wp('4%')}}>{localization.passwordConfirmError}</Text>:null}
                    <View style={styles.inputBorder} >
                        <TextInput
                            style={styles.textInput}
                            placeholder={localization.confirmPassword}
                            autoCorrect={false}
                            returnKeyType="next"
                            ref="passwordConfirm"
                            secureTextEntry={true}
                            placeholderTextColor="#A3A3A3"
                            underlineColorAndroid="transparent"
                            onChangeText={(passwordConfirm) => this.setState({passwordConfirm})}
                        />
                        <Image source={Lock} style={styles.image4_5}/>
                    </View>

                    {/* <View style={{justifyContent:'center', alignItems:'center'}}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: hp('0%') }}>
                            {photo ? <Image
                                source={{ uri: photo.uri }}
                                style={{ width: 100, height: 100 }}
                            /> : null}
                        </View>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', width: wp('30%'), height: hp('6%'), backgroundColor: '#538805', borderRadius: wp('3%'), marginVertical: hp('2%'), alignItems: 'center', justifyContent: 'center' }}
                            onPress={this.handleImagePicker}
                        >

                            <Text style={{ textAlign: 'center', color: 'white', fontSize: wp('4%'), fontWeight: 'bold', marginRight: wp('2%') }}>
                                {localization.addImage}
                            </Text>
                            <Icon name="image" size={wp('4%')} color="white" />
                        </TouchableOpacity>
                    </View> */}
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

                    <View style={{justifyContent:'flex-start', alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>this.handleRegister()} style={{justifyContent:'center', alignItems:'center', width:wp('40%'), height:hp('7%')}}>
                            <Image source={ButtonBG} style={{width:wp('40%'), height:hp('7%'), right:wp('0%'), top:hp('0%'), resizeMode:'contain', justifyContent:'center', position:'absolute'}}/>
                            <View>
                            {this.props.auth.isRegistring?<View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}><ActivityIndicator/><Text style={styles.buttonText}> {localization.register} </Text></View>:<Text style={styles.buttonText}> {localization.register} </Text>}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
                <Toast ref="toast"/>
            </ImageBackground>
         )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        location: state.location,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ register, fetchCities }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)

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
});