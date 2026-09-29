import { string, required, min, object } from 'yup';
import Token from '../../../helpers/Token';
import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import http, { setClientToken } from '../../../helpers/Http';
import { showMessage, hideMessage } from "react-native-flash-message";
import { PasswordRecoveryForm } from './PasswordRecoveryForm';

const PasswordRecoverySchema = object().shape({
    token: string().min(4).required("Token is required!"),
    password: string().min(8, "Password must be at least 8 characters").required("Password is required!")
});

export const PasswordRecovery = props => {
    const user_id = props.params.user_id;
    const phone = props.params.phone;
    const navigation = useNavigation();

    const submitHandler = (data) => {
        http.patch(`users/${user_id}/password/reset`, {
            user_id: user_id,
            token: data.token,
            password: data.password
        })
        .then(res => {
            showMessage({
                message: "You password has been changed successfully.",
                type: "success",
            });
            navigation.navigate('AccountScreen');
        }).catch(error => {
            showMessage({
                message: error.message,
                type: "danger"
            });
        })
    }

    const handleCodeResend = () => {
        http.post('users/password/recovery', {
            user_id: user_id,
            phone: phone
        })
        .then(result => {
            showMessage({
                message: "Password reset code has been sent successfully.",
                type: "success",
            });
            props.params.token = result.data.token;
        }).catch(error => {
            showMessage({
                message: error.message,
                type: "danger"
            });
        })
    }

    return (
        <React.Fragment>
            <PasswordRecoveryForm validationSchema={PasswordRecoverySchema} 
                submitHandler={submitHandler} handleCodeResend={handleCodeResend} />
        </React.Fragment>
    );
}