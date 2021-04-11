import { string, required, min, email, object } from 'yup';
import React from 'react';

import { useNavigation } from '@react-navigation/native';
import http from '../../helpers/Http';

import { RegistrationForm } from '../Forms/Auth/RegistrationForm';
import { showMessage, hideMessage } from "react-native-flash-message";

const RegistrationValidationSchema = object().shape({
    name: string().required("Name is required!"),
    phone: string().required("Phone number is required!"),
    password: string()
        .min(4, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
    email: string().email().required('Email is required')
});

export const RegistrationContainer = () => {
    const navigation = useNavigation();

    const submitHandler = (data) => {
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
            <RegistrationForm submitHandler={submitHandler}
                validationSchema={RegistrationValidationSchema} />
        </React.Fragment>
    );
}