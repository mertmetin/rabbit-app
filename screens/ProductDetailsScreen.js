import * as React from 'react';
import { Image, ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ProductDetailsCard } from '../components/Cards/ProductDetailsCard';
import { connect } from 'react-redux'

function ProductDetailsScreen(props) {
    console.log(props);     
    const item = props.route.params.item;
    const dispatch = {
        addItemToCart: props.addItemToCart,
        increaseItemQuantity: props.increaseItemQuantity,
        decreaseItemQuantity: props.decreaseItemQuantity
    }
    
    return (
        <ProductDetailsCard item={item} dispatch={dispatch} cardItems={props.cardItems}/>
    ); 
}


const mapStateToProps = (state) => {
    return {
        cartItems: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: product }),
        increaseItemQuantity: (product) => dispatch({ 
            type: 'INCREASE_ITEM_QUANTITY',
            payload: product }),
        decreaseItemQuantity: (product) => dispatch({
            type: 'DECREASE_ITEM_QUANTITY',
            payload: product
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsScreen);
