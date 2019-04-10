import React, { Component } from 'react'
import { View, Image, Text, FlatList, I18nManager, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements';
import localization from '../../localization/localization';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import { fetchAds, deleteAds } from '../../actions/advertiserActions';
import { fetchProduct } from '../../actions/productsActions';
import Toast, {DURATION} from 'react-native-easy-toast'

import bg from '../../assets/images/bg3.png';
import ButtonBG from '../../assets/images/buttonBG.png';

class AdsList extends Component {

    state = {
        product: [
            { image: require('../../assets/images/item1.png'), title: 'مانجو سكرى', qun: '3 كيلو', price: '35 ريال', date: '15 يناير 2019', discription: 'مانجو انتاج مزارعنا تم زراعته طبقا لشروط و المواصفات العالميه' },
            { image: require('../../assets/images/item2.png'), title: 'برتقال بلدى', qun: '3 كيلو', price: '25 ريال', date: '17 يناير 2019', discription: 'برتقال انتاج مزارعنا تم زراعته طبقا لشروط و المواصفات العالميه' },
        ]
    }

    componentDidMount() {
        if(this.props.auth.userToken)
            this.props.fetchAds(this.props.auth.userToken)
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={{ marginVertical: hp('2%'), backgroundColor:'rgba(255,255,255,0.9)'}} onPress={() => {
                this.props.fetchProduct(item.id)
                this.props.navigation.navigate('Product');
            }}>
                <View
                    style={{ flex: 1, borderWidth: wp('0.2%'), height: hp('20%'), marginHorizontal: 15, borderColor: 'red', borderRadius: wp('2%') }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column', flex: 1, marginTop:hp('0.5%') }}>
                            <View style={[{justifyContent:'center'}, I18nManager.isRTL?{marginRight: wp('1%'), alignItems:'flex-end'}:{marginLeft: wp('1%'), alignItems:'flex-start'}]}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#000' }}>{item.date.date.substr(0,10)}</Text>
                            </View>
                            <Text style={styles.text}>{item.title}</Text>
                            <Text style={styles.text}>{item.quantity}</Text>
                            <View style={{flexDirection: 'row', justifyContent:'space-between', marginTop:hp('0.75%')}}>
                                <TouchableOpacity
                                    onPress={()=>{
                                        this.refs.toast.show(localization.deleted);
                                        this.props.deleteAds(this.props.auth.userToken, item.id)
                                        this.props.fetchAds(this.props.auth.userToken)
                                    }}
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
                                source={{uri:item.image}}
                                style={[{ width: wp('46%'), height: hp('19.8%')}, I18nManager.isRTL?{borderTopLeftRadius: wp('2%'), borderBottomLeftRadius: wp('2%') }:{borderTopRightRadius: wp('2%'), borderBottomRightRadius: wp('2%') }]}
                            />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { ads, isFetching, error } = this.props.ads
        // console.warn(ads, isFetching, error)
        return (
            <View style={{backgroundColor:'white', flex:1}}>
            <View>
                {/* HEADER */}
                <Header title={localization.myAds}/>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <Image source={bg} style={{width:wp('40%'), height:hp('30%'), position:'absolute', zIndex:-1, top:hp('50%'), resizeMode:'contain'}}/>
                </View>
                {this.props.auth.userToken?
                <View>
                {!isFetching?
                    <FlatList
                        data={ads}
                        // extraData={ads}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        style={{height:hp('80%')}}
                    />:<ActivityIndicator/>}
                    <View style={{justifyContent:'flex-start', alignItems:'center', marginTop:hp('1%')}}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('AddNewAds')}} style={{justifyContent:'center', alignItems:'center', width:wp('40%'), height:hp('7%')}}>
                            <Image source={ButtonBG} style={{width:wp('40%'), height:hp('7%'), right:wp('0%'), top:hp('0%'), resizeMode:'contain', justifyContent:'center', position:'absolute'}}/>
                            <View>
                                <Text style={styles.buttonText}> {localization.addNewAds} </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                :<View style={{height:hp('20%'), justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontWeight:'bold', width:wp('80%'), overflow:'scroll', textAlign:'center', fontSize:wp('4%'), color:'gray'}}> {localization.pleaseLoginToAddAds} </Text>
                </View>
                }
            </View>
            <Toast ref="toast"/>
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


function mapStateToProps(state) {
    return {
        auth: state.auth,
        ads: state.ads,
        products: state.products,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ fetchAds, fetchProduct, deleteAds }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdsList)