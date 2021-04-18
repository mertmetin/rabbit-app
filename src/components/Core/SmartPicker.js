import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Text } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Icon, Picker } from 'native-base';

export function SmartPicker(props) {
    const items = props.items;
    const label = props.label;
    const selectedValue = props.selectedValue;
    const onValueChange = props.onValueChange;
    var pickerItems = [];

    for (let k in items) {
        var type = items[k];
        var item = (
            <Picker.Item label={type.type} value={type.type} key={type.id} />
        );
        pickerItems.push(item);
    }

    return (
        <View style={{width: '100%'}}>
            <Item picker style={styles.item} >
                <Label style={styles.label}>{label}</Label>
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    placeholder= {'select'}
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={selectedValue}
                    onValueChange={(val) => {
                        onValueChange(val);
                    }}
                >
                    {pickerItems}
                </Picker>
            </Item>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        marginBottom: 20
    },
    label: {
        flex: 1, 
        fontFamily: 'sodo-sans-regular'
    }
});