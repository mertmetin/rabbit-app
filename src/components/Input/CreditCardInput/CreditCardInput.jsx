import React from 'react';
import { StyleSheet } from 'react-native';
import { Input } from '@ui-kitten/components';

import { getFormattedCreditCardNumber } from '@/utils/credit_card';

const INPUT_CARD_NO = 'card_no';

export const CreditCardInput = ({ value, setFieldValue }) => {
    const changeHandler = (val) => setFieldValue(INPUT_CARD_NO, getFormattedCreditCardNumber(val))

    return (
        <Input
            style={styles.field}
            placeholder='4242 4242 4242 4242'
            label='Card Number'
            value={value}
            textStyle={styles.textStyle}
            onChangeText={changeHandler}
            size='large'
            keyboardType={'numeric'}
            maxLength={19}
        />
    );
}

const styles = StyleSheet.create({
    field: {
        marginTop: 5,
        marginBottom: 5
    },
    textStyle: {
        fontWeight: '600'
    },
});