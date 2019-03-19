import React, { Component } from 'react'
import { View, Image, Text, FlatList, I18nManager, StyleSheet, TouchableOpacity, StatusBar } from 'react-native'
import { Icon } from 'react-native-elements';
import localization from '../../localization/localization';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';

import Header from '../../components/Header';

import bg from '../../assets/images/bg3.png';
import ButtonBG from '../../assets/images/buttonBG.png';

class AdsList extends Component {

    state = {
        product: [
            { image: require('../../assets/images/item1.png'), cat: 'مانجو سكرى', qun: '3 كيلو', price: '35 ريال', date: '15 يناير 2019', discription: 'مانجو انتاج مزارعنا تم زراعته طبقا لشروط و المواصفات العالميه' },
            { image: require('../../assets/images/item2.png'), cat: 'برتقال بلدى', qun: '3 كيلو', price: '25 ريال', date: '17 يناير 2019', discription: 'برتقال انتاج مزارعنا تم زراعته طبقا لشروط و المواصفات العالميه' },
        ]
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={{ marginVertical: hp('2%'), backgroundColor:'rgba(255,255,255,0.9)'}} onPress={() => this.props.navigation.navigate('Product', {'id':item.id})}>
                <View
                    style={{ flex: 1, borderWidth: wp('0.2%'), height: hp('20%'), marginHorizontal: 15, borderColor: 'red', borderRadius: wp('2%') }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column', flex: 1, marginTop:hp('0.5%') }}>
                            <View style={[{justifyContent:'center'}, I18nManager.isRTL?{marginRight: wp('1%'), alignItems:'flex-end'}:{marginLeft: wp('1%'), alignItems:'flex-start'}]}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#000' }}>{item.date}</Text>
                            </View>
                            <Text style={styles.text}>{item.cat}</Text>
                            <Text style={styles.text}>{item.qun}</Text>
                            <View style={{flexDirection: 'row', justifyContent:'space-between', marginTop:hp('0.75%')}}>
                                <TouchableOpacity
                                    style={{ flexDirection: 'row',borderRadius:wp('2%'), marginLeft:wp('1%') ,width: wp('20%'), height:hp('5%'),backgroundColor: 'red', alignItems: 'center', justifyContent: 'center' }}>

                                    <Text style={{ textAlign: 'center', color: 'white', fontSize: wp('5%'), fontWeight: 'bold', marginRight: wp('0%') }}>
                                        {localization.delete}
                                    </Text>
                                    <Icon name="delete" size={wp('4%')} color="white" />
                                </TouchableOpacity>
                                <Text style={styles.text}>{item.price}</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: 'flex-end', flex: 1 }}>
                            <Image
                                source={item.image}
                                style={[{ width: wp('46%'), height: hp('19.8%')}, I18nManager.isRTL?{borderTopLeftRadius: wp('2%'), borderBottomLeftRadius: wp('2%') }:{borderTopRightRadius: wp('2%'), borderBottomRightRadius: wp('2%') }]}
                            />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <View style={{backgroundColor:'white', flex:1}}>
            <View>
                {/* HEADER */}
                <Header title={localization.myAds}/>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <Image source={bg} style={{width:wp('40%'), height:hp('30%'), position:'absolute', zIndex:-1, top:hp('50%'), resizeMode:'contain'}}/>
                </View>
                <FlatList
                    data={this.state.product}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={{justifyContent:'flex-start', alignItems:'center', marginTop:hp('10%')}}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('AddNewAds')}} style={{justifyContent:'center', alignItems:'center', width:wp('40%'), height:hp('7%')}}>
                        <Image source={ButtonBG} style={{width:wp('40%'), height:hp('7%'), right:wp('0%'), top:hp('0%'), resizeMode:'contain', justifyContent:'center', position:'absolute'}}/>
                        <View>
                            <Text style={styles.buttonText}> {localization.addNewAds} </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: wp('4.5%'),
        fontWeight: 'bold',
        color: '#000',
        margin:hp('0.5%')
    },
    buttonText:{
        color:'white', 
        textAlign:'center', 
        fontSize:wp('4.5%'), 
        fontWeight:'600'
    },
})
export default AdsList;