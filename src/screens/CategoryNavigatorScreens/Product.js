import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  I18nManager,  
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dimensions from 'Dimensions';
import call from 'react-native-phone-call';
import Share, {ShareSheet, Button} from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {fetchProduct} from '../../actions/productsActions'


import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import localization from '../../localization/localization';
import Header from '../../components/Header';


class Product extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            uploaded: false,
            base64DataImage:'',
        }
    }

    onCancel() {
        console.log("CANCEL")
        this.setState({visible:false});
    }

    call = (phoneNumber) => {
        //handler to make a call
        const args = {
        number: phoneNumber,
        prompt: false,
        };
    
        call(args).catch(console.error);
    };

    downloadImage() {
        // alert('share')
        RNFetchBlob.config({
            fileCache: true
        })
        .fetch("GET", this.props.products.product.image)
        // the image is now dowloaded to device's storage
        .then(resp => {
            // the image path you can use it directly with Image component
            imagePath = resp.path();
            return resp.readFile("base64");
        })
        .then(async base64Data => {
            var base64Data ="data:image/png;base64," + base64Data;
            // console.warn(base64Data);
            // here's base64 encoded image
            this.setState({
                base64DataImage: base64Data,
                uploaded : true,
            })
            // remove the file from storage
            return "done";
        });
    }

    render() {
        const { product, isFetching } = this.props.products
        // console.warn(product.image)
        if(!isFetching)
            this.downloadImage()
        console.log(isFetching)
        return (
            <View style={{backgroundColor:'white', flex:1}}>
                {/* HEADER */}
                <Header title={localization.fruits} backScreen="SignIn"/>
                {isFetching? 
                <ActivityIndicator size={50} color="green" /> :
                <View>
                
                    <Image
                        source={{uri:product.image}}
                        style={styles.imageStyle}
                    />
                    <View style={styles.catView}>
                        <Text style={[styles.catTextStyle, !I18nManager.isRTL?{borderTopLeftRadius: wp('2%'), borderBottomLeftRadius: wp('2%') }:{borderTopRightRadius: wp('2%'), borderBottomRightRadius: wp('2%') }]}>{product.title}</Text>
                    </View>
                    <View style={styles.priceView}>
                        <Text style={styles.priceText}>{product.price} {localization.rial}</Text>
                    </View>
                    <View style={styles.discriptionView}>
                        <Text style={[styles.discriptionText, {overflow:'scroll'}]}>{product.description}</Text>
                    </View>

                    <View style={styles.buttonsViewStyle}>
                        <TouchableOpacity style={styles.buttonStyle} onPress={() => this.call(product.phone)}>
                            <Text style={styles.buttonTextStyle}>{localization.call}</Text>
                            <Icon color="white" name="phone" size={wp('5%')} style={{marginLeft:wp('1%')}}/>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={styles.buttonStyle}>
                            <Text style={styles.buttonTextStyle}>{localization.favourit}</Text>
                            <Icon color="white" name="heart" size={wp('5%')} style={{marginLeft:wp('1%')}}/>
                        </TouchableOpacity> */}
                        <TouchableOpacity style={styles.buttonStyle}  onPress={()=>{
                            console.warn(this.state.base64DataImage)
                            this.state.uploaded?Share.open({ 
                                title: 'Mahasel',
                                message: product.title + ' \n' + product.description + '\n' + product.price + " " + localization.rial,
                                url: this.state.base64DataImage 
                            }):null;
                        }}>
                            <Text style={styles.buttonTextStyle}>{localization.share}</Text>
                            <Icon color="white" name="share" size={wp('5%')} style={{marginLeft:wp('1%')}}/>
                        </TouchableOpacity>
                    </View>

                </View>
                }
                {/* <ShareSheet visible={this.state.visible} onCancel={this.onCancel.bind(this)}>
                    <Button iconSrc={{ uri: TWITTER_ICON }}
                            onPress={()=>{
                        this.onCancel();
                        setTimeout(() => {
                            Share.shareSingle(Object.assign(shareOptions, {
                            "social": "twitter"
                            }));
                        },300);
                        }}>Twitter</Button>
                    <Button iconSrc={{ uri: FACEBOOK_ICON }}
                            onPress={()=>{
                        this.onCancel();
                        setTimeout(() => {
                            Share.shareSingle(Object.assign(shareOptions, {
                            "social": "facebook"
                            }));
                        },300);
                        }}>Facebook</Button>
                    <Button iconSrc={{ uri: WHATSAPP_ICON }}
                            onPress={()=>{
                        this.onCancel();
                        setTimeout(() => {
                            Share.shareSingle(Object.assign(shareOptions, {
                            "social": "whatsapp"
                            }));
                        },300);
                        }}>Whatsapp</Button>
                    <Button iconSrc={{ uri: GOOGLE_PLUS_ICON }}
                            onPress={()=>{
                        this.onCancel();
                        setTimeout(() => {
                            Share.shareSingle(Object.assign(shareOptions, {
                            "social": "googleplus"
                            }));
                        },300);
                        }}>Google +</Button>
                    <Button iconSrc={{ uri: EMAIL_ICON }}
                            onPress={()=>{
                        this.onCancel();
                        setTimeout(() => {
                            Share.shareSingle(Object.assign(shareOptions, {
                            "social": "email"
                            }));
                        },300);
                        }}>Email</Button>
                    <Button iconSrc={{ uri: PINTEREST_ICON }}
                            onPress={()=>{
                        this.onCancel();
                        setTimeout(() => {
                            Share.shareSingle(Object.assign(shareOptions, {
                            "social": "pinterest"
                            }));
                        },300);
                        }}>Pinterest</Button>
                    <Button
                        iconSrc={{ uri: CLIPBOARD_ICON }}
                        onPress={()=>{
                        this.onCancel();
                        setTimeout(() => {
                            if(typeof shareOptions["url"] !== undefined) {
                            Clipboard.setString(shareOptions["url"]);
                            if (Platform.OS === "android") {
                                ToastAndroid.show('Link copiado al portapapeles', ToastAndroid.SHORT);
                            } else if (Platform.OS === "ios") {
                                AlertIOS.alert('Link copiado al portapapeles');
                            }
                            }
                        },300);
                        }}>Copy Link</Button>
                    <Button iconSrc={{ uri: MORE_ICON }}
                        onPress={()=>{
                        this.onCancel();
                        setTimeout(() => {
                            Share.open(shareOptions)
                        },300);
                        }}>More</Button>
                </ShareSheet> */}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: '#74b245'
    },
    imageStyle: {
        width: '100%',
        height: hp('37%')
    },
    catView: {
        flex: 1,
        position:'relative',
        top: hp('-3%'),
        width:null,
        alignSelf:'flex-end',
    },
    catTextStyle: {
        fontWeight: 'bold',
        fontSize: wp('8%'),
        paddingHorizontal: wp('4%'),
        color: '#fff',
        backgroundColor: '#FF4634',
    },
    priceView: {
        flex: 1,
        alignItems: 'flex-start',
        marginTop: 20,
        marginLeft: 20
    },
    priceText: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold'
    },
    discriptionView: {
        width: wp('80%'),
        marginHorizontal:wp('10%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('5%'),
        height:hp('30%'),
    },
    discriptionText: {
        fontSize: wp('4%'),
        color: '#000',
        fontWeight: 'bold',
        height:hp('26%'),

    },
    buttonStyle:{
      flexDirection:'row',
      justifyContent:'center', 
      alignItems:'center',
      width:wp('30%'),
      backgroundColor:'#EC4100',
      padding:wp('1.5%'),
      borderRadius:wp('3%')
    },
    buttonsViewStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp('2%'),
        marginHorizontal: wp('10%')
    },
    buttonTextStyle: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: wp('4.5%'),
    }

})

function mapStateToProps(state) {
    return {
        products: state.products
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ fetchProduct }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Product);

