import React from 'react';
import { StyleSheet } from 'react-native';
import { Input } from '@ui-kitten/components';

import { getFormattedDate } from '@/utils/date';

const INPUT_DATE = 'exp_date';

export const DateInput = ({ value, setFieldValue, ...props }) => {
    const changeHandler = (val) => setFieldValue(INPUT_DATE, getFormattedDate(val))
    
    return (
        <Input
            style={styles.field}
            value={value}
            textStyle={styles.textStyle}
            onChangeText={changeHandler}
            size='large'
            maxLength={5}
            keyboardType={'numeric'}
            {...props}
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