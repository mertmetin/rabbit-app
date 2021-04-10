import * as Yup from 'yup';
import Token from '../../helpers/Token';
import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import http, { setClientToken } from '../../helpers/Http';
import { PasswordChangeForm } from '../Forms/Auth/PasswordChangeForm';
import { showMessage, hideMessage } from "react-native-flash-message";

const PasswordChangeValidationSchema = Yup.object().shape({
    password: Yup
        .string()
        .min(4, ({ min }) => `New password must be at least ${min} characters`)
        .required('Password is required')
});

export const PasswordChangeContainer = ({ userId }) => {
    const navigation = useNavigation();

    const submitHandler = (data) => {
        http.patch(`users/${userId}/password/change`, {
            oldPassword: data.oldPassword,
            password: data.password
        })
        .then(res => {
            showMessage({
                message: "Your password has been changed successfully.",
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

    return (
        <React.Fragment>
            <PasswordChangeForm 
                validationSchema={PasswordChangeValidationSchema} 
                submitHandler={submitHandler} 
            />
        </React.Fragment>
    );
}