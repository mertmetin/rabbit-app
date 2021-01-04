import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import { validate } from 'validate.js/validate';
import { showMessage, hideMessage } from "react-native-flash-message";
import { Container, Header, Text, Content, Form, Item, Input, Label, Icon, View } from 'native-base';
import { FloatingLabel } from '../../FloatingLabel';
import { ActionButton } from '../../ActionButton';
import { GooglePlaces } from '../../GooglePlaces';
import constraints from '../../../constants/Constraints';
import http from '../../../helpers/Http';

export function AddCardForm(props) {
    const userId = props.userId;
    const [cardNumber, setCardNumber] = React.useState('');
    const [cvc, setCVC] = React.useState('');
    const [expiryDate, setExpiryDate] = React.useState('');
    const [errors, setErrors] = React.useState([]);
    const navigation = useNavigation();

    const onPress = () => {
        var exp_date = expiryDate.split('/');
        var exp_month = exp_date[0];
        var exp_year = exp_date[1];

        // var customValidator = () => {
        //     console.log('asd');
        // }

        // validate.validators.customValidator();

        const fields = {
            card_number: cardNumber,
            cvc: cvc,
            expiry_date: expiryDate
        };
        const validation = validate(fields, constraints.credit_card);


        if (validation) {
            setErrors(validation)
            return false;
        }

        http.post('payment/methods', {
            user_id: userId,
            type: 'card',
            card: {
                number: cardNumber,
                cvc: cvc,
                exp_month: exp_month,
                exp_year: exp_year
            }
        })
        .then(res => {
            navigation.push('CardsScreen', { data: userId });
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <View>
            <FloatingLabel label={'Card No'} type={'credit_card'} 
                onTextChange={setCardNumber} value={cardNumber} error={errors.card_number} />
            <FloatingLabel label={'Expiry Date'} type={'date'} value={expiryDate}
                onTextChange={setExpiryDate} value={expiryDate} error={errors.expiry_date} />
            <FloatingLabel label={'CVC'} onTextChange={setCVC} value={cvc} maxLength={4} error={errors.cvc} />
            <ActionButton title={'Add Card'} onPress={onPress} />
        </View>
    );
}