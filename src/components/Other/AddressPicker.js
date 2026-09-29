import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export function AddressPicker(props) {
    const label = props.label;
    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate('AddressScreen', { data: props.userId });
    }

    return (
        <RectButton style={styles.option} onPress={onPress}>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.optionTextContainer}>
                    <Text style={styles.optionText}>{label}</Text>
                </View>
                <View style={styles.optionIconContainer}>
                    <Ionicons name={'arrow-forward'} size={22} color="rgba(0,0,0,0.35)" />
                </View>
            </View>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    contentContainer: {
        paddingTop: 15,
    },
    optionIconContainer: {
        position: 'absolute',
        right: 0,
    },
    option: {
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0,
        borderColor: '#ededed',
    },
    lastOption: {
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    optionText: {
        fontWeight: 'bold',
        fontSize: 15,
        alignSelf: 'flex-start',
        marginTop: 1,
    },
});
