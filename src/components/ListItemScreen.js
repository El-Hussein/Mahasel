import React, { Component } from 'react'
import { View, Image, Text, StatusBar, StyleSheet } from 'react-native'
import { Header, Title, Left, Button, Body, Right } from 'native-base'
import { Icon } from 'react-native-elements';


class ListItemScreen extends Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.item.cat,
        headerStyle: {
            backgroundColor: '#74b245'
          },
          headerTintColor: 'white',
    })
    render() {
        const item = { image: require('../images/item1.png'), cat: 'مانجو سكرى', qun: '3 كيلو', price: '35.00 ريال', date: '15 يناير 2019', discription: 'مانجو انتاج مزارعنا تم زراعته طبقا لشروط و المواصفات العالميه' };
        return (
            <View>
                <Image
                    source={item.image}
                    style={styles.imageStyle}
                />
                <View style={styles.catView}>
                    <Text style={styles.catTextStyle}>{item.cat}</Text>
                </View>
                <View style={styles.priceView}>
                    <Text style={styles.priceText}>{item.price}</Text>
                </View>
                <View style={styles.discriptionView}>
                    <Text style={styles.discriptionText}>{item.discription}</Text>
                </View>

                <View style={styles.buttonsViewStyle}>
                    <Button style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('callUs')}>
                        <Text style={styles.buttonTextStyle}>اتصال</Text>
                    </Button>
                    <Button style={styles.buttonStyle}>
                        <Text style={styles.buttonTextStyle}>مفضله</Text>
                    </Button>
                    <Button style={styles.buttonStyle}>
                        <Text style={styles.buttonTextStyle}>مشاركه</Text>
                    </Button>

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
        height: 300
    },
    catView: {
        flex: 1,
        top: -20,
        marginRight: 10,
        width:null,
        alignSelf:'flex-end',
    },
    catTextStyle: {
        fontWeight: 'bold',
        fontSize: 25,
        padding: 5,
        color: '#fff',
        backgroundColor: '#f24f09',
        borderRadius: 5
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
        flex: 1,
        width: '85%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 70
    },
    discriptionText: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold'
    },
    buttonsViewStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30%'
    },
    buttonStyle: {
        width: 100,
        borderRadius: 10,
        backgroundColor: '#f24f09',
        margin: 10
    },
    buttonTextStyle: {
        color: '#fff',
        textAlign: 'center',
        flex: 1,
        fontWeight: 'bold',
        fontSize: 18
    }

})

export default ListItemScreen