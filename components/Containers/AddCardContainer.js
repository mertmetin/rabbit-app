import * as Yup from 'yup';
import Token from '../../helpers/Token';
import React, { Component } from 'react';
import { AddCardForm } from '../Forms/Payment/AddCardForm';
import { useNavigation } from '@react-navigation/native';
import http, { setClientToken } from '../../helpers/Http';
import { showMessage, hideMessage } from "react-native-flash-message";

const AddCardSchema = Yup.object().shape({
    card_no: Yup.number().
        test('len', 'Must be exactly 16 digits', (val) => { if (val) return val.toString().length === 16; }).
        required('Credit card number required!'),
    exp_date: Yup.string().
        test('len', 'Must be exactly 5 digits', (val) => { if (val) return val.toString().length === 5; }).
        required('Expiry date required!'),
    cvc: Yup.string().
        test('len', 'Must be exactly 3 digits', (val) => { if (val) return val.toString().length === 3; }).
        required('CVC required!')
});

export const AddCardContainer = props => {
    const user_id = props.user_id;
    const navigation = useNavigation();

    const onPress = (data) => {
        var exp_date = data.exp_date.split('/');
        var exp_month = exp_date[0];
        var exp_year = exp_date[1];

        http.post('payment/methods', {
            user_id: user_id,
            type: 'card',
            card: {
                number: data.card_no,
                cvc: data.cvc,
                exp_month: exp_month,
                exp_year: exp_year
            }
        })
        .then(result => {
            navigation.push('CardsScreen', { data: user_id });
        })
        .catch(error => {
            showMessage({
                message: error.message,
                type: "danger"
            });
        })
    }

    return (
        <React.Fragment>
            <AddCardForm onPress={onPress}
                validationSchema={AddCardSchema} />
        </React.Fragment>
    )
}