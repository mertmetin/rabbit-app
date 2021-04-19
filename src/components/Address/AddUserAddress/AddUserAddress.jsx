import axios from 'axios';
import React from 'react';
import http from '../../../helpers/Http';
import { showMessage, hideMessage } from "react-native-flash-message";

import { PlaceAutocomplete } from '@/components/PlaceAutocomplete';

export const AddUserAddress = ({ data }) => {
    const addAddress = (location) => {
        var user_id = data.user_id;
        location.user_id = user_id;

        http.post(`users/${user_id}/addresses`, {address: location})
        .then(result => {
            navigation.navigate('Home');
        }).catch(error => {
            showMessage({
                message: error.message,
                type: "danger"
            });
        })
    }

    return (
        <PlaceAutocomplete />
    )
}