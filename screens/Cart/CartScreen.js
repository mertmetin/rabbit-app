import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { CartCards } from '../../components/Cards/CartCards';

function CartScreen(props) {

    return(
        <CartCards items= {props.cartItems} />
    )
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
