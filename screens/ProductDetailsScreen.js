import * as React from 'react';
import { Image, ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ProductDetailsCard } from '../components/Cards/ProductDetailsCard';
import { connect } from 'react-redux'

function ProductDetailsScreen({addItemToCart, navigation, route }) {
    const item = route.params.item;
    return (
        <ProductDetailsCard item={item} addItemToCart={addItemToCart} />
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: product })
    }
}

export default connect(null, mapDispatchToProps)(ProductDetailsScreen);
