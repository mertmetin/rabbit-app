import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import { validate } from 'validate.js/validate';
import { showMessage, hideMessage } from "react-native-flash-message";
import { Container, Header, Text, Content, Form, Item, Input, Label, Icon, View, Picker } from 'native-base';
import { FloatingLabel } from '../../FloatingLabel';
import { ActionButton } from '../../ActionButton';
import { GooglePlaces } from '../../GooglePlaces';
import { SmartPicker } from '../../Core/SmartPicker';
import constraints from '../../../constants/Constraints';
import http from '../../../helpers/Http';
import axios from 'axios';

export function AddAddressForm(props) {
    const userId = props.userId;
    const [place, setPlace] = React.useState([]);
    const [aptSuiteFloor, setAptSuiteFloor] = React.useState('');
    const [businessOrBuildingName, setBusinessOrBuildingName] = React.useState('');
    const [addressTypes, setAddressTypes] = React.useState([]);
    const [addressType, setAddressType] = React.useState('');
    const [errors, setErrors] = React.useState([]);
    const navigation = useNavigation();

    const onPress = () => {
        const fields = {
            address: place.description
        };
        const validation = validate(fields, constraints.address);

        // if (validation) {
        //     setErrors(validation)
        //     return false;
        // }

        const address = {
            'place_id': place.place_id,
            'description': place.description,
            'main_text': place.structured_formatting.main_text,
            'secondary_text': place.structured_formatting.secondary_text,
            'apt_suite_floor': aptSuiteFloor,
            'business_or_building_name': businessOrBuildingName,
            'address_type': addressType,
        }

        const url = 'https://maps.googleapis.com/maps/api/place/details/json?' +
            'key=***REMOVED***&' +
            '&input=bar' +
            '&placeid=' + place.place_id;
        
        axios.get(url).then(res => {

            if (!res.data)
                return;

            var result = res.data.result;
            var geometry = result.geometry;
            address.lat = geometry.location.lat;
            address.lng = geometry.location.lng;

            http.post('addAddress', {
                userId: userId,
                address: address,
            })
            .then(res => {
                showMessage({
                    message: 'Address is added successfully.',
                    type: "success"
                });
                navigation.push('AddressScreen', {data: userId});
            }).catch(error => {
                const msg = error.response.data.message;
                showMessage({
                    message: msg,
                    type: "danger"
                });
            })
        });
    }

    React.useEffect(() => {
        http.post('getAddressTypes', {})
        .then(res => {
            if (!res.data)
                return;

            var data = res.data;
            setAddressTypes(data);
            
        }).catch(error => {
            const msg = error.response.data.message;
            showMessage({
                message: msg,
                type: "danger"
            });
        })
    }, []);

    return (
        <View>
            <SmartPicker items={addressTypes} label={'Address Type'} 
                selectedValue={addressType} onValueChange={setAddressType} />
            <GooglePlaces onAddressSelected={setPlace} error={errors.address} />
            <FloatingLabel label={'Apt / Suite / Floor'} onTextChange={setAptSuiteFloor} />
            <FloatingLabel label={'Business or building name'} onTextChange={setBusinessOrBuildingName} />
            <ActionButton title={'Save'} onPress={onPress} />
        </View>
    );
}