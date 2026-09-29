import { string, required, min, object } from 'yup';
import React from 'react';

import Token from '../../../helpers/Token';
import { LoginForm } from './LoginForm';
import { useNavigation } from '@react-navigation/native';

import http, { setClientToken } from '../../../helpers/Http';
import { showMessage } from "react-native-flash-message";

const LoginValidationSchema = object().shape({
    phone: string().required("Phone number is required!"),
    password: string()
        .min(4, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required')
});

export const Login = () => {
    const navigation = useNavigation();

    const submitHandler = (data) => {
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
            <LoginForm submitHandler={submitHandler}
                validationSchema={LoginValidationSchema} />
        </React.Fragment>
    );
}