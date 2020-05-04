import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Icon } from 'native-base';
import Colors from '../constants/Colors';

export function FloatingLabel(props) {
    var value = props.value;
    var maxLength = (props.maxLength) ? props.maxLength : 255;
    const type = props.type;
    const [isFocused, setFocus] = React.useState(false);
    const error = props.error;

    console.log(props.error);

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

    const formatPhoneNumber = (val) => {
        return val.replace(/\D+/g, '')
            .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    }

    const onChangeText = (val) => {        
        if (type == 'date')
            val = formatDate(val);
        else if (type == 'credit_card')
            val = formatCreditCard(val);
        else if (type == 'phone_number')
            val = formatPhoneNumber(val);
        
        props.onTextChange(val);

    }
    
    const errMsg = (
        <View style={{ flexDirection: 'row', paddingTop: 20, paddingBottom: 20, fontSize: 12, marginTop: -30}}>
            <Ionicons
                name='md-close'
                size={18}
                style={{ marginBottom: -5 }}
                color= {Colors.errorText}
            />
            <Text style={{ color: 'rgb(97,97, 98)', marginLeft: 5 }}>{error}</Text>
        </View>
    );

    return (
        <View>
            <Item floatingLabel error={true} style={{ borderColor: (isFocused) ? Colors.accentGreen : '#CCCCCC', marginBottom: 20 }}>
                <Label style={{ fontFamily: 'sodo-sans-regular' }}> {props.label} </Label>
                <Input onFocus={onFocus} onBlur={onBlur} style={{ marginTop: (value) ? 0 : 5 }} keyboardType={props.keyboardType} onChangeText={onChangeText} value={value} maxLength={maxLength} secureTextEntry={props.secure} />
                {/* <Icon name='close-circle' /> */}
            </Item>
            {error && errMsg}
        </View>
       
    );
}

const styles = StyleSheet.create({
    item: {
        fontFamily: 'sodo-sans-bold', 
        marginBottom: 20
    }
});