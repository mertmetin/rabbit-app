import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';

export function EmptyCart(props) {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Ionicons
                    name={'cart'}
                    size={120}
                    style={styles.icon}
                />
            </View>
            <Text style={styles.text}>You have no items in your cart.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: 'auto', 
        marginBottom: 'auto'
    },
    text: {
        marginTop: 20, 
        fontFamily: 'sodo-sans-regular'
    },
    icon: {
        color: 'rgb(209,210,211)', 
        paddingLeft: 30, 
        paddingRight: 30, 
        paddingTop: 15, 
        paddingBottom: 19 
    },
    iconContainer: {
        backgroundColor: 'rgb(233,234,235)', 
        borderRadius: 100
    }
});