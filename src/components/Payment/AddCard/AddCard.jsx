import { string, number, test, required, object} from 'yup';
import Token from '../../../helpers/Token';
import React, { Component } from 'react';
import { AddCardForm } from './AddCardForm';
import { useNavigation } from '@react-navigation/native';
import http, { setClientToken } from '../../../helpers/Http';
import { showMessage, hideMessage } from "react-native-flash-message";

const validationSchema = object().shape({
    card_no: number().
        test('len', 'Must be exactly 16 digits', (val) => { if (val) return val.toString().length === 16; }).
        required('Credit card number required!'),
    exp_date: string().
        test('len', 'Must be exactly 5 digits', (val) => { if (val) return val.toString().length === 5; }).
        required('Expiry date required!'),
    cvc: string().
        test('len', 'Must be exactly 3 digits', (val) => { if (val) return val.toString().length === 3; }).
        required('CVC required!')
});

export const AddCard = ({ user_id, setShouldFetch }) => {
    const navigation = useNavigation();

    const submitHandler = (data) => {
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
            navigation.navigate('CardsScreen', { id: user_id });
            setShouldFetch(true);
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
            <AddCardForm submitHandler={submitHandler}
                validationSchema={validationSchema} />
        </React.Fragment>
    )
}