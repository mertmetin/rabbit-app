import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import { validate } from 'validate.js/validate';
import { Container, Header, Content, Form, Item, Input, Label, Icon, View } from 'native-base';
import { FloatingLabel } from '../../FloatingLabel';
import { ActionButton } from '../../ActionButton';
import constraints from '../../../constants/Constraints';
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
        console.log('here');
        axios.post('http://localhost:8000/api/register', {
            phone: phoneNumber,
            name: fullName,
            email: email,
            password: password
        })
        .then(res => {
            const user_id = res.data;
            const phone = phoneNumber;
            navigation.navigate(props.navigateTo, { user_id: user_id, phone: phone });
        }).catch(error => {
            console.log(error.response.data);
        })
    }

    return(
        <View>
            <FloatingLabel label={'Phone Number'} type={'phone_number'} value={phoneNumber} onTextChange={setPhoneNumber} error={errors.phone} />
            <FloatingLabel label={'Password (min 4 chars)'} value={password} onTextChange={setPassword} secure={true} error={errors.password} />
            <FloatingLabel label={'Fullname'} value={fullName} onTextChange={setFullName} error={errors.fullName} />
            <FloatingLabel label={'Email'} value={email} onTextChange={setEmail} error={errors.email} />
            <ActionButton title={'Join now'} onPress={onPress} />
        </View>
    )
}