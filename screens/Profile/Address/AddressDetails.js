import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Picker } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { showMessage, hideMessage } from "react-native-flash-message";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ActionButton } from '../../../components/ActionButton';
import { FloatingLabel } from '../../../components/FloatingLabel';
import { GooglePlaces } from '../../../components/GooglePlaces';


export default function AddressDetails({ navigation, route }) {
    const userId = route.params.userId;
    const address = route.params.address;
    const [addressData, setAddressData] = React.useState([]);
    const [aptSuiteFloor, setAptSuiteFloor] = React.useState(address.apt_suite_floor);
    const [businessOrBuildingName, setBusinessOrBuildingName] = React.useState(address.business_or_building_name);

    const saveAddress = () => {
        address.apt_suite_floor = aptSuiteFloor;
        address.business_or_building_name = businessOrBuildingName;

        axios.post('http://localhost:8000/api/editAddress', {
            userId: userId,
            address: address
        })
        .then(res => {
            showMessage({
                message: 'Address updated',
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

    const removeAddress = () => {
        axios.post('http://localhost:8000/api/deleteAddress', {
            userId: userId,
            id: address.id
        })
        .then(res => {
            showMessage({
                message: 'Address deleted',
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

    return (
        <ScrollView>
            <View style={styles.container}>
                <GooglePlaces onAddressSelected={setAddressData} value={address.description} />
                <FloatingLabel label={'Apt / Suite / Floor'} onTextChange={setAptSuiteFloor} value={aptSuiteFloor} />
                <FloatingLabel label={'Business or building name'} onTextChange={setBusinessOrBuildingName} value={businessOrBuildingName} />
                <ActionButton title={'Remove saved address'} onPress={removeAddress} />

                <ActionButton title={'Save'} style={{ marginTop: 20 }} onPress={saveAddress} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
});