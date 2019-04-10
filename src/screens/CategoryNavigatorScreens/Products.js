import React, { Component } from 'react'
import { View, Image, Text, FlatList, StyleSheet, TouchableOpacity, I18nManager, ActivityIndicator } from 'react-native'
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
import {fetchProducts, fetchProduct} from '../../actions/productsActions'


class FruitListScreen extends Component {
    componentDidMount(){
        this.props.fetchProducts(this.props.navigation.getParam('category_id'))
    }
    
    state = {
        data: [
            { id: 0,image: require('../../assets/images/item1.png'), cat: 'مانجو سكرى', qun: '3 كيلو', price: '35.00 ريال', date: '15 يناير 2019', discription: 'مانجو انتاج مزارعنا تم زراعته طبقا لشروط و المواصفات العالميه' },
            { id: 1,image: require('../../assets/images/item2.png'), cat: 'برتقال بلدى', qun: '3 كيلو', price: '25.00 ريال', date: '17 يناير 2019', discription: 'برتقال انتاج مزارعنا تم زراعته طبقا لشروط و المواصفات العالميه'  },
            { id: 2,image: require('../../assets/images/item3.png'), cat: 'تفاح لبنانى', qun: '3 كيلو', price: '35.00 ريال', date: '15 يناير 2019',discription: 'تفاح انتاج مزارعنا تم زراعته طبقا لشروط و المواصفات العالميه'  },
            { id: 3,image: require('../../assets/images/item4.png'), cat: 'بطيخ', qun: '3 كيلو', price: '35.00 ريال', date: '15 يناير 2019',discription: 'بطيخ انتاج مزارعنا تم زراعته طبقا لشروط و المواصفات العالميه'  },
            { id: 4,image: require('../../assets/images/item1.png'), cat: 'مانجو سكرى', qun: '3 كيلو', price: '35.00 ريال', date: '15 يناير 2019',discription: 'مانجو انتاج مزارعنا تم زراعته طبقا لشروط و المواصفات العالميه'  },
            { id: 5,image: require('../../assets/images/item2.png'), cat: 'برتقال بلدى', qun: '3 كيلو', price: '25.00 ريال', date: '17 يناير 2019',discription: 'برتقال انتاج مزارعنا تم زراعته طبقا لشروط و المواصفات العالميه'  },
        ]
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={{ marginVertical: hp('2%')}} onPress={() => {
                this.props.fetchProduct(item.id)
                this.props.navigation.navigate('Product');
            }}>
                <View
                    style={{ flex: 1, borderWidth: wp('0.2%'), height: hp('20%'), marginHorizontal: 15, borderColor: 'red', borderRadius: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column', flex: 1, marginRight: 30, marginTop: 6 }}>
                            <Text style={styles.text}>{item.title}</Text>
                            <Text style={styles.text}>{item.quantity} {localization.kilo}</Text>
                            <Text style={styles.text}>{item.price} {localization.rial}</Text>
                            <View style={{ justifyContent: 'flex-end', flex: 1, marginRight: 65, marginBottom: 5 }}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#000', paddingHorizontal:wp('1%') }}>{item.date.date.substr(0,10)}</Text>
                            </View>

                        </View>
                        <View style={{ alignItems: 'flex-end', flex: 1 }}>
                            <Image
                                source={{uri:item.image}}
                                style={[{ width: 170, height: hp('19.8%')}, I18nManager.isRTL?{borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }:{borderTopRightRadius: 10, borderBottomRightRadius: 10 }]}
                                />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        const { products, isFetching } = this.props.products
        // alert(JSON.stringify(products))
        return (
            <View style={{backgroundColor:'white'}}>
                {/* HEADER */}
                <Header title={localization.fruits} backScreen="SignIn"/>
                {isFetching? <ActivityIndicator size={50} color="green" /> :
                <FlatList
                    data={products}
                    // data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.name}
                    style={{height:hp('89%')}}
                />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        paddingHorizontal:wp('1%')
    }
})

function mapStateToProps(state) {
    return {
        products: state.products
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ fetchProducts, fetchProduct }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FruitListScreen);