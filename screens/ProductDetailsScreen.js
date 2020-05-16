import * as React from 'react';
import { Image, ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ProductDetailsCard } from '../components/Cards/ProductDetailsCard';
import { connect } from 'react-redux'

function ProductDetailsScreen(props) {
    var quantity = 0;
    const item = props.route.params.item;
    const dispatch = {
        addItemToCart: props.addItemToCart,
        increaseItemQuantity: props.increaseItemQuantity,
        decreaseItemQuantity: props.decreaseItemQuantity
    }

    if (props.cartItems.quantity[item.id])
        quantity = props.cartItems.quantity[item.id]

    console.log(quantity);


    return (
        <ProductDetailsCard item={item} dispatch={dispatch} quantity={quantity} />
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
