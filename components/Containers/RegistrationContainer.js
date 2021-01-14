import * as Yup from 'yup';
import Token from '../../helpers/Token';
import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import http, { setClientToken } from '../../helpers/Http';
import { RegistrationForm } from '../Forms/Auth/RegistrationForm';
import { showMessage, hideMessage } from "react-native-flash-message";

const RegistrationValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    phone: Yup.string().required("Phone number is required!"),
    password: Yup
        .string()
        .min(4, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
    email: Yup.string().email()
});

export const RegistrationContainer = props => {
    const navigation = useNavigation();
    const onPress = (data) => {
        console.log(data);
        http.post('users', {
            name: data.name,
            phone: data.phone,
            password: data.password,
            email: data.email
        })
        .then(result => {
            const data = result.data;
            navigation.navigate('PostSignUpScreen', { data: data });
        }).catch(error => {
            showMessage({
                message: error.message,
                type: "danger",
            });
        })
    }

    return (
        <React.Fragment>
            <RegistrationForm onPress={onPress}
                validationSchema={RegistrationValidationSchema} />
        </React.Fragment>
    );
}