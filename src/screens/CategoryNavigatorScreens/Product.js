import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
  I18nManager,  
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dimensions from 'Dimensions';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import localization from '../../localization/localization';
import Header from '../../components/Header';
import {  Title, Left, Button, Body, Right } from 'native-base'


class ListItemScreen extends Component {

    render() {
        const item = { image: require('../../assets/images/item1.png'), cat: 'مانجو', qun: '3 كيلو', price: '35.00 ريال', date: '15 يناير 2019', discription: ' مانجو انتاج مزارعنا تم زراعته طبقا لشروط و المواصفات العالميه ' };
        return (
            <View style={{backgroundColor:'white', flex:1}}>
            <View>
                {/* HEADER */}
                <Header title={localization.fruits} backScreen="SignIn"/>
               
                <Image
                    source={item.image}
                    style={styles.imageStyle}
                />
                <View style={styles.catView}>
                    <Text style={[styles.catTextStyle, !I18nManager.isRTL?{borderTopLeftRadius: wp('2%'), borderBottomLeftRadius: wp('2%') }:{borderTopRightRadius: wp('2%'), borderBottomRightRadius: wp('2%') }]}>{item.cat}</Text>
                </View>
                <View style={styles.priceView}>
                    <Text style={styles.priceText}>{item.price}</Text>
                </View>
                <View style={styles.discriptionView}>
                    <Text style={[styles.discriptionText, {overflow:'scroll'}]}>{item.discription}</Text>
                </View>

                <View style={styles.buttonsViewStyle}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('callUs')}>
                        <Text style={styles.buttonTextStyle}>{localization.call}</Text>
                        <Icon color="white" name="phone" size={wp('5%')} style={{marginLeft:wp('1%')}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle}>
                        <Text style={styles.buttonTextStyle}>{localization.favourit}</Text>
                        <Icon color="white" name="heart" size={wp('5%')} style={{marginLeft:wp('1%')}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle}>
                        <Text style={styles.buttonTextStyle}>{localization.share}</Text>
                        <Icon color="white" name="share" size={wp('5%')} style={{marginLeft:wp('1%')}}/>
                    </TouchableOpacity>

                </View>
            </View>
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
      width:wp('25%'),
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

export default ListItemScreen