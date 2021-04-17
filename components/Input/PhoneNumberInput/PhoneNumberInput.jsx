import React from 'react';
import { StyleSheet } from 'react-native';
import { Input } from '@ui-kitten/components';

import { getFormattedPhoneNumber } from '../../../utils/phone_number';

const INPUT_PHONE = 'phone';

export const PhoneNumberInput = ({ value, setFieldValue } ) => {
    const changeHandler = (val) => setFieldValue(INPUT_PHONE, getFormattedPhoneNumber(val))
    
    return (
        <Input
            style={styles.field}
            placeholder='(613) 327-8306'
            label='Phone Number'
            value={value}
            textStyle={styles.textStyle}
            onChangeText={changeHandler}
            size='large'
            maxLength={14}
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