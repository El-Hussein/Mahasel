import React, { Component } from 'react';
import {
    View,
    Text,
    ActivityIndicator
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions/categoryActions';

class HomeScreen extends Component {

    componentDidMount() {

        this.props.fetchCategories()

    }

    render() {

        const { categories, isFetching } = this.props.categories
        // alert(JSON.stringify(categories))

        if (isFetching) {
            return(
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size={'large'} /> 
                </View>
            )
        } else {
            return(
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <Text>{categories.length}</Text>
                </View>
            )
        }

    }

}

function mapStateToProps(state) {
    return {
        categories: state.category
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ fetchCategories }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)