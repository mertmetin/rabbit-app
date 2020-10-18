import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, SafeAreaView, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

function AddressPickerButton(props) {
    const address = props.address;
    var btnChooseAddress = (
        <View style={styles.innerContainer}>
            <Text style={styles.textChooseDelivery}>Choose Delivery Address</Text>
            <Ionicons name={'ios-arrow-forward'} size={22} color="rgba(0,0,0,0.35)" />
        </View> 
    );

    if (address.main_text)
    {
        const addressType = address.address_type.type;

        if (addressType == 'home')
            icon = 'md-home';
        else if (addressType == 'work')
            icon = 'md-business';
        else if (addressType == 'other')
            icon = 'md-navigate';
        
        const textAddressType = addressType.charAt(0).toUpperCase() + addressType.slice(1);

        btnChooseAddress = (
            <View style={styles.innerContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Ionicons
                        name={icon}
                        size={24} />
                    <Text style={{ marginLeft: 5, marginRight: 10, fontWeight: 'bold' }}>{textAddressType}:</Text>
                    <Text>{address.main_text}</Text>
                </View>
                <View>
                    <Ionicons name={'ios-arrow-down'} size={22} color="rgba(0,0,0,0.35)" />
                </View>
            </View>
        );
    }

    return (
        <RectButton style={styles.container} >
            {btnChooseAddress}
        </RectButton>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fafafa',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 12.5,
        paddingBottom: 12.5,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0,
        borderColor: '#ededed',
    },
    innerContainer: {
        width: '100%', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    icon: {
        position: 'absolute',
        right: 0
    },
    textChooseDelivery: {
        fontSize: 15,
        fontWeight: 'bold'
    }
});

export default AddressPickerButton;