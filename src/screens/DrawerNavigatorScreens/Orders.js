import React, { Component } from 'react'
import { View, Image, Text, FlatList, StyleSheet, TouchableOpacity, I18nManager } from 'react-native'
import { Icon } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import localization from '../../localization/localization';
import Header from '../../components/Header';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {fetchOrders} from '../../actions/OrdersActions'

import bg from '../../assets/images/bg2.png';




class Orders extends Component {

    componentDidMount(){
        this.props.fetchOrders()
    }
    
    state = {
        data: [
            { id: 0,image: require('../../assets/images/item1.png'), cat: 'مانجو سكرى', qun: '3 كيلو', price: '35.00 ريال', date: '15 يناير 2019', discription: 'مانجو انتاج مزارعنا تم زراعته طبقا لشروط و المواصفات العالميه' },
            { id: 1,image: require('../../assets/images/item2.png'), cat: 'برتقال بلدى', qun: '3 كيلو', price: '25.00 ريال', date: '17 يناير 2019', discription: 'برتقال انتاج مزارعنا تم زراعته طبقا لشروط و المواصفات العالميه'  },
            { id: 5,image: require('../../assets/images/item3.png'), cat: 'برتقال بلدى', qun: '3 كيلو', price: '25.00 ريال', date: '17 يناير 2019',discription: 'برتقال انتاج مزارعنا تم زراعته طبقا لشروط و المواصفات العالميه'  },
        ]
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={{ marginVertical: hp('2%'), backgroundColor:'rgba(255,255,255,0.9)'}} onPress={() => this.props.navigation.navigate('Product', {'id':item.id})}>
                <View
                    style={{ flex: 1, borderWidth: wp('0.2%'), height: hp('20%'), marginHorizontal: 15, borderColor: 'red', borderRadius: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column', flex: 1, marginRight: 30, marginTop: 6 }}>
                            <Text style={styles.text}>{item.cat}</Text>
                            <Text style={styles.text}>{item.qun}</Text>
                            <Text style={styles.text}>{item.price}</Text>
                            <View style={{ justifyContent: 'flex-end', flex: 1, marginRight: 65, marginBottom: 5 }}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#000' }}>{item.date}</Text>
                            </View>

                        </View>
                        <View style={{ alignItems: 'flex-end', flex: 1 }}>
                            <Image
                                source={item.image}
                                style={[{ width: 170, height: hp('19.8%')}, I18nManager.isRTL?{borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }:{borderTopRightRadius: 10, borderBottomRightRadius: 10 }]}
                            />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <View style={{backgroundColor:'white'}}>

                {/* HEADER */}
                <Header title={localization.fruits} backScreen="SignIn"/>
                <Image source={bg} style={{width:wp('100%'), height:hp('100%'), position:'absolute', zIndex:-1}}/>
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    style={{height:hp('89%')}}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000'

    }
})

function mapStateToProps(state) {
    return {
        orders: state.orders
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ fetchOrders }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);