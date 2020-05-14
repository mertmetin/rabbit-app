import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { CartCards } from '../../components/Cards/CartCards';
import { EmptyCart } from '../../components/Other/EmptyCart';

function CartScreen(props) {
    console.log(props.cartItems);
    const view = (props.cartItems.length) 
        ? (<CartCards items={props.cartItems} />) : <EmptyCart /> 

    return(view)
}

const mapStateToProps = (state) => {
    return {
        cartItems: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (product) => dispatch({ type: 'REMOVE_FROM_CART', payload: product })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
