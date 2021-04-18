import { string, required, object } from 'yup';
import Token from '../../../helpers/Token';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import http from '../../../helpers/Http';
import { showMessage, hideMessage } from "react-native-flash-message";
import { PasswordResetForm } from './PasswordResetForm';

const PasswordRecoverySchema = object().shape({
    phone: string().required("Phone number is required!")
});

export const PasswordReset = () => {
    const navigation = useNavigation();
    const submitHandler = (data) => {
        http.post('users/password/recovery', data)
        .then(result => {
            navigation.navigate('PasswordRecoveryScreen', result.data);
        }).catch(error => {
            showMessage(error.message);
        })
    }

    return (
        <React.Fragment>
            <PasswordResetForm submitHandler={submitHandler} />
        </React.Fragment>
    );
}