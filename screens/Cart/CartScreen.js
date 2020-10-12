import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { CartCards } from '../../components/Cards/CartCards';
import { EmptyCart } from '../../components/Other/EmptyCart';


function CartScreen(props) {
    const itemCount = Object.keys(props.cartItems.items).length;

    const view = (itemCount > 0) 
        ? (<CartCards items={props.cartItems} onIncrease={props.increaseItemQuantity} 
            onDecrease={props.decreaseItemQuantity}
        />) : <EmptyCart /> 

    return(view)
}

const mapStateToProps = (state) => {
    return {
        cartItems: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (product) => dispatch({ type: 'REMOVE_FROM_CART', payload: product }),
        increaseItemQuantity: (product) => dispatch({
            type: 'INCREASE_ITEM_QUANTITY',
            payload: product
        }),
        decreaseItemQuantity: (product) => dispatch({
            type: 'DECREASE_ITEM_QUANTITY',
            payload: product
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
