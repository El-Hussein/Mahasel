import React, { Component } from 'react'
import { View, Image, Text, FlatList, StyleSheet, ScrollView, Picker, TouchableOpacity, I18nManager, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
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
import { fetchCities } from '../../actions/locationActions';
import {fetchProducts, fetchProduct, filterProducts} from '../../actions/productsActions';
import Country from '../../assets/images/country.png';
import City from '../../assets/images/city.png';


class FruitListScreen extends Component {
    constructor(props){
        super()
        this.state = {
            city:0,
            country:0,
        }
        this.loadMore = this.loadMore.bind(this)
        console.warn(props.navigation.getParam('category_id'))
    }
    componentDidMount(){
        this.props.fetchProducts(this.props.navigation.getParam('category_id'), 1 )
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

    loadMore(){
        if(this.props.products.paginationFilter.next_page_url){
            this.props.filterProducts(this.props.navigation.getParam('category_id'), this.props.products.paginationFilter.current_page+1 , this.state.city)    
        }else{
            if(this.props.products.pagination.next_page_url){
                this.props.fetchProducts(this.props.navigation.getParam('category_id'), this.props.products.pagination.current_page+1)
            }
        }
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
    ListEmptyView = () => {
        return (
            <View style={styles.MainContainer}>
                <Text style={{textAlign: 'center'}}> {localization.noProductsAvailable} </Text>
            </View>
        );
    }
      
    render() {
        const { products, isFetching, productsFilter, isFiltering, paginationFilter, pagination } = this.props.products
        console.warn(paginationFilter.total!=0?productsFilter.length>0?JSON.stringify(productsFilter):'filter empty':products.length>0?JSON.stringify(products):'empty')
        // this.props.location.cities?console.warn(this.props.location.cities):null
        FlatProduct = ()=>{

            if(isFetching){
                return(
                    <ActivityIndicator size={20} color="green" />
                )
            }
            if(products.length>0){
                return(
                    <FlatList
                    data={products.length>0?products:[]}
                    extraData = {isFetching}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.name}
                    style={{height:hp('80%')}}
                    ListEmptyComponent={this.ListEmptyView}
                    onEndReached={()=>this.loadMore()}
                    onEndThreshold={0}
                    />
                )
            }else if(pagination.total != undefined){
                return(
                    <View style={styles.MainContainer}>
                        <Text style={{textAlign: 'center'}}> {localization.userName} </Text>
                    </View>
                )
            }else{
                return(
                    null
                )
            }
        }
        FlatProductFilter = ()=>{
            if(isFiltering){
                return(
                    <ActivityIndicator size={20} color="green" />
                )
            }
            if(productsFilter.length>0){
                return(
                    <FlatList
                    data={productsFilter.length>0?productsFilter:[]}
                    extraData = {isFiltering}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.name}
                    style={{height:hp('80%')}}
                    ListEmptyComponent={this.ListEmptyViewFilter}
                    onEndReached={()=>this.loadMore()}
                    onEndThreshold={0}
                    />
                )
            }else{
                return(
                    <View style={styles.MainContainer}>
                        <Text style={{textAlign: 'center'}}> {localization.noProductsAvailableFilter} </Text>
                    </View>
                )
            } 
        }
        return (
            <View style={{backgroundColor:'white'}}>
                {/* HEADER */}
                <Header title={localization.fruits} backScreen="SignIn"/>
                <View style={{marginHorizontal:wp('10%'), paddingTop:hp('1%')}}>
                    
                    <View style={{backgroundColor:'#538805', marginBottom:hp('2%'), width:wp('80%'), justifyContent:'center', alignItems:'center', height:hp('6%'), borderRadius:wp('3.5%')}}>
                        <Icon name="arrow-down" color="white" size={wp('3%')} style={{position:'absolute', left:wp('3%')}}/>
                        <Picker
                        selectedValue={this.state.country}
                        style={{color:'white', width:wp('50%'), marginRight:wp('0%')}}
                        onValueChange={(itemValue, itemIndex) =>{
                            this.props.fetchCities(itemValue);
                            this.setState({country: itemValue, city:0})
                        }}>
                            <Picker.Item label={localization.country} value="0" />
                            {this.props.location.countries?this.renderPickerCountryItem():<Picker.Item label=" "/>}
                        </Picker>
                        <Image source={Country} style={[styles.image4_5, {position:'absolute', right:wp('3%')}]}/>
                    </View>

                    <View style={{backgroundColor:'#538805', marginBottom:hp('2%'), width:wp('80%'), justifyContent:'center', alignItems:'center', height:hp('6%'), borderRadius:wp('3.5%')}}>
                        <Icon name="arrow-down" color="white" size={wp('3%')} style={{position:'absolute', left:wp('3%')}}/>
                        <Picker
                        selectedValue={this.state.city}
                        style={{color:'white', width:wp('50%'), marginRight:wp('0%')}}
                        onValueChange={(itemValue, itemIndex) =>{
                            this.setState({city: itemValue});
                            // console.warn(itemValue)
                            if(itemValue == 0)return;
                            this.props.filterProducts(this.props.navigation.getParam('category_id'), 1 , itemValue)
                        }
                        }>
                            <Picker.Item label={localization.city} value="0" />
                            {this.props.location.cities?this.renderPickerCityItem():<Picker.Item label=" "/>}
                        </Picker>
                        <Image source={City} style={[styles.image4_5, {position:'absolute', right:wp('3%')}]}/>
                    </View>

                </View>  
                <ScrollView style={{height:hp('89%')}}>
                
                <FlatProduct />
                
                <FlatProductFilter />
                </ScrollView>
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
        products: state.products,
        location: state.location,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ fetchProducts, fetchProduct, filterProducts, fetchCities }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FruitListScreen);