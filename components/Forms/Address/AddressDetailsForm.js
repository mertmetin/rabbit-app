import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import { validate } from 'validate.js/validate';
import { showMessage, hideMessage } from "react-native-flash-message";
import { Container, Header, Text, Content, Form, Item, Input, Label, Icon, View } from 'native-base';
import { FloatingLabel } from '../../FloatingLabel';
import { ActionButton } from '../../ActionButton';
import { GooglePlaces } from '../../GooglePlaces';
import constraints from '../../../constants/Constraints';
import http from '../../../helpers/Http';

export function AddressDetailsForm(props) {
    const userId = props.userId;
    const [address, setAddress] = React.useState(props.address);
    const [aptSuiteFloor, setAptSuiteFloor] = React.useState(address.apt_suite_floor);
    const [businessOrBuildingName, setBusinessOrBuildingName] = React.useState(address.business_or_building_name);
    const [errors, setErrors] = React.useState([]);
    const navigation = useNavigation();

    const saveAddress = () => {
        address.apt_suite_floor = aptSuiteFloor;
        address.business_or_building_name = businessOrBuildingName;

        http.post('editAddress', {
            userId: userId,
            address: address
        })
        .then(res => {
            showMessage({
                message: 'Address updated',
                type: "success"
            });
            navigation.navigate('AddressScreen');
        }).catch(error => {
            const msg = error.response.data.message;
            showMessage({
                message: msg,
                type: "danger"
            });
        })
    }

    const removeAddress = () => {
        http.post('deleteAddress', {
            userId: userId,
            id: address.id
        })
        .then(res => {
            showMessage({
                message: 'Address deleted',
                type: "success"
            });
            navigation.navigate('AccountScreen');
        }).catch(error => {
            const msg = error.response.data.message;
            showMessage({
                message: msg,
                type: "danger"
            });
        })
    }

    return (
        <View>
            <GooglePlaces onAddressSelected={setAddress} value={address.description} error={errors.address} disabled={true} />
            <FloatingLabel label={'Apt / Suite / Floor'} onTextChange={setAptSuiteFloor} value={aptSuiteFloor} />
            <FloatingLabel label={'Business or building name'} onTextChange={setBusinessOrBuildingName} value={businessOrBuildingName} />
            <ActionButton title={'Remove saved address'} onPress={removeAddress} />
            <View style={{ marginTop: 20 }}>
                <ActionButton title={'Save'} onPress={saveAddress} />
            </View>
        </View>
    )
}