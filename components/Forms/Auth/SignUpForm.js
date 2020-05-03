import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container, Header, Content, Form, Item, Input, Label, Icon, View } from 'native-base';
import { FloatingLabel } from '../../FloatingLabel';
import { ActionButton } from '../../ActionButton';
import Colors from '../../../constants/Colors';
import axios from 'axios';

export function SignUpForm(props) {
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [fullName, setFullName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const navigation = useNavigation();

    const onPress = () => {
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
            <FloatingLabel label={'Phone Number'} value={phoneNumber} onTextChange={setPhoneNumber} />
            <FloatingLabel label={'Password (min 4 chars)'} value={password} onTextChange={setPassword} />
            <FloatingLabel label={'Fullname'} value={fullName} onTextChange={setFullName} />
            <FloatingLabel label={'Email'} value={email} onTextChange={setEmail} />
            <ActionButton title={'Join now'} onPress={onPress} />
        </View>
    )
}