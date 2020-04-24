import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Picker } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { showMessage, hideMessage } from "react-native-flash-message";
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import { ActionButton } from '../../../components/ActionButton';
import { GooglePlaces } from '../../../components/GooglePlaces';

export default function AddAddressScreen({ navigation, route }) {
    const userId = route.params.data;
    const [address, setAddress] = React.useState([]);

    const onPress = () => {
        axios.post('http://localhost:8000/api/addAddress', {
            userId: userId,
            address: address,
        })
            .then(res => {
                showMessage({
                    message: 'Address is added successfully.',
                    type: "success"
                });
                navigation.navigate('Profile');
            }).catch(error => {
                const msg = error.response.data.message;
                showMessage({
                    message: msg,
                    type: "danger"
                });
            })
    }

    var onTextChange = (data, details) => {
        const address = {
            'place_id': data.place_id,
            'description': data.description,
            'main_text': data.structured_formatting.main_text,
            'secondary_text': data.structured_formatting.secondary_text
        };
        setAddress(address);
    }
    
    return (
        // <ScrollView contentContainerStyle={styles.containerStyle}>
        <View style={styles.containerStyle} >
            <GooglePlaces placeholder={'Search'} onPress={onTextChange} />
            <ActionButton title={'Save'} onPress={onPress} />
        </View>
    );
}

const styles = StyleSheet.create({
    submitButton: {
        borderRadius: 5,
        backgroundColor: '#7a42f4',
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    containerStyle: {
        paddingTop: 25,
        paddingBottom: 25,
        backgroundColor: 'rgb(254, 254, 254)',
        display: 'flex',
        justifyContent: 'space-between',
        height: '100%'
    },
    input: {
        margin: 15,
        marginLeft: 20,
        marginRight: 20,
        padding: 15,
        height: 50,
        borderRadius: 5,
        borderColor: '#cacaca',
        borderWidth: 1
    },
    submitButton: {
        borderRadius: 5,
        backgroundColor: '#7a42f4',
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center'
    },
    forgotPasswordButton: {
        marginTop: 20,
        textAlign: 'center',
        alignSelf: 'center',
        color: '#6d828b'
    },
    forgotPasswordText: {
        color: '#6d828b'
    },
    registerButton: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#6a69c3',
        borderRadius: 5,
        marginLeft: 20,
        marginRight: 20,
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
    },
    registerText: {
        color: '#6a69c3',
        textAlign: 'center',
        fontWeight: 'bold'
    }
});

const viewStyle = StyleSheet.create({
    containerStyle: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        marginTop: 25,
        marginBottom: 25
    }
});