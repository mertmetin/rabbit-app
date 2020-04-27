import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import Colors from '../constants/Colors';

export function FloatingLabel(props) {
    var value = props.value;
    var maxLength = (props.maxLength) ? props.maxLength : 255;
    const type = props.type;
    const [isFocused, setFocus] = React.useState(false);

    if (type == 'date')
        maxLength = 5;
    else if (type == 'credit_card')
        maxLength = 19;

    const onFocus = () => {
        setFocus(true);
    }
    
    const onBlur = () => {
        setFocus(false);
    }

    const formatDate = (val) => {
        const len = val.length;

        if (len == 3 && !val.includes('/'))
            val = val.substring(0, len - 1) + '/' + val.substring(len - 1, len);

        return val;
    }

    const formatCreditCard = (val) => {
        return val.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
    }


    const onChangeText = (val) => {

        if (type == 'date')
            val = formatDate(val);
        else if (type == 'credit_card')
            val = formatCreditCard(val);
    
        props.onTextChange(val);

    }

    return (
        <Item floatingLabel style={{ borderColor: (isFocused) ? Colors.accentGreen : '#CCCCCC', fontFamily: 'sodo-sans-bold', marginBottom: 20 }}>
            <Label style={{ fontFamily: 'sodo-sans-regular' }}> {props.label} </Label>
            <Input onFocus={onFocus} onBlur={onBlur} style={{ marginTop: (value) ? 0 : 5 }} onChangeText={onChangeText} value={value} maxLength={maxLength} />
        </Item>
    );
}