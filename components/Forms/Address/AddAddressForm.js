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

// import axios from 'axios';

export function AddAddressForm(props) {
    const userId = props.userId;
    const [addressData, setAddressData] = React.useState([]);
    const [aptSuiteFloor, setAptSuiteFloor] = React.useState('');
    const [businessOrBuildingName, setBusinessOrBuildingName] = React.useState('');
    const [errors, setErrors] = React.useState([]);
    const navigation = useNavigation();

    const onPress = () => {
        const fields = {
            address: addressData.description
        };
        const validation = validate(fields, constraints.address);

        if (validation) {
            setErrors(validation)
            return false;
        }

        const address = {
            'place_id': addressData.place_id,
            'description': addressData.description,
            'main_text': addressData.structured_formatting.main_text,
            'secondary_text': addressData.structured_formatting.secondary_text,
            'apt_suite_floor': aptSuiteFloor,
            'business_or_building_name': businessOrBuildingName
        }

        http.post('addAddress', {
            userId: userId,
            address: address,
        })
        .then(res => {
            showMessage({
                message: 'Address is added successfully.',
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
    
    return (
        <View>
            <GooglePlaces onAddressSelected={setAddressData} error={errors.address} />
            <FloatingLabel label={'Apt / Suite / Floor'} onTextChange={setAptSuiteFloor} />
            <FloatingLabel label={'Business or building name'} onTextChange={setBusinessOrBuildingName} />
            <ActionButton title={'Save'} onPress={onPress} />
        </View>
    );
}