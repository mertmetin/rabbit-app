import * as Yup from 'yup';
import { Link } from '../Link';
import Token from '../../helpers/Token';
import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import http, { setClientToken } from '../../helpers/Http';
import { showMessage, hideMessage } from "react-native-flash-message";
import { PasswordResetForm } from '../Forms/Auth/PasswordResetForm';

const PasswordRecoverySchema = Yup.object().shape({
    phone: Yup.string().required("Phone number is required!")
});

export const PasswordResetContainer = props => {
    const navigation = useNavigation();
    const onPress = (data) => {
        http.post('users/password/recovery', data)
        .then(result => {
            navigation.navigate('PasswordRecoveryScreen', result.data);
        }).catch(error => {
            showMessage(error.message);
        })
    }

    return (
        <React.Fragment>
            <PasswordResetForm onPress={onPress} />
        </React.Fragment>
    );
}