import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import { validate } from 'validate.js/validate';
import { SafeAreaView } from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";
import { Container, Header, Content, Form, Item, Input, Label, Icon, View } from 'native-base';
import { FloatingLabel } from '../../FloatingLabel';
import { ActionButton } from '../../ActionButton';
import constraints from '../../../constants/Constraints';
import http from '../../../helpers/Http';
import axios from 'axios';

export function SignUpForm(props) {
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [fullName, setFullName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [errors, setErrors] = React.useState([]);
    const navigation = useNavigation();

    const onPress = () => {
        const fields = { 
            phone: phoneNumber, 
            password: password, 
            fullName: fullName,
            email: email 
        };
        const validation = validate(fields, constraints.signup);
       
        if (validation)
        {
            setErrors(validation)
            return false;
        }

        http.post('users', {
            phone: phoneNumber,
            name: fullName,
            email: email,
            password: password
        })
        .then(res => {
            const data = res.data;
            console.log(data);

            navigation.navigate(props.navigateTo, { data: data, phone: phoneNumber });
        }).catch(error => {
            const msg = error.response.data.message;
            showMessage({
                message: msg,
                type: "danger",
            });
        })
    }

    return(
        <SafeAreaView>
            <FloatingLabel label={'Phone Number'} type={'phone_number'} value={phoneNumber} onTextChange={setPhoneNumber} error={errors.phone} />
            <FloatingLabel label={'Password (min 4 chars)'} value={password} onTextChange={setPassword} secure={true} error={errors.password} />
            <FloatingLabel label={'Fullname'} value={fullName} onTextChange={setFullName} error={errors.fullName} />
            <FloatingLabel label={'Email'} value={email} onTextChange={setEmail} error={errors.email} />
            <ActionButton title={'Join now'} onPress={onPress} />
        </SafeAreaView>
    )
}