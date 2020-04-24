import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import Colors from '../constants/Colors';

export function FloatingLabel(props) {
    var value = props.value;
    const [isFocused, setFocus] = React.useState(false);

    const onFocus = () => {
        setFocus(true);
    }

    const onBlur = () => {
        setFocus(false);
    }

    const onChangeText = (val) => {
        props.onTextChange(val);
    }

    return (
        <Item floatingLabel style={{ borderColor: (isFocused) ? Colors.accentGreen : '#CCCCCC', fontFamily: 'sodo-sans-bold', marginBottom: 20 }}>
            <Label style={{ fontFamily: 'sodo-sans-regular' }}> {props.label} </Label>
            <Input onFocus={onFocus} onBlur={onBlur} style={{ marginTop: (value) ? 0 : 5 }} onChangeText={onChangeText} value={value}/>
        </Item>
    );
}