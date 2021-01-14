import * as Yup from 'yup';
import Token from '../../helpers/Token';
import React, { Component } from 'react';
import { LoginForm } from '../Forms/Auth/LoginForm';
import { useNavigation } from '@react-navigation/native';
import http, { setClientToken } from '../../helpers/Http';
import { showMessage, hideMessage } from "react-native-flash-message";

const LoginValidationSchema = Yup.object().shape({
    phone: Yup.string().required("Phone number is required!"),
    password: Yup
        .string()
        .min(4, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required')
});

export const LoginContainer = props => {
    const navigation = useNavigation();
    const onPress = (data) => {
        var credentials = {
            phone: data.phone,
            password: data.password
        }

        http.post('login', credentials)
        .then(result => {
            const _token = result.data.token;
            Token.removeToken();
            Token.setToken(_token);
            navigation.push('AccountScreen');
        })
        .catch(error => {
            showMessage({
                message: error.message,
                type: "danger"
            });
        });
    }

    return (
        <React.Fragment>
            <LoginForm onPress={onPress}
                validationSchema={LoginValidationSchema} />
        </React.Fragment>
    );
}