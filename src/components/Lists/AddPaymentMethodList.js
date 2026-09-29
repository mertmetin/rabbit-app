import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Divider, List, Button, ListItem, Menu, MenuItem, Avatar } from '@ui-kitten/components';

const data = [
    {
        title: 'Add New Card',
    }
];

export const AddPaymentMethodList = (props) => {
    const renderItemAccessory = (props) => (
        <Ionicons color={'#3154fe'} size={24} name='add' />
    );

    const renderItem = ({ item, index }) => {
        return <ListItem
            key={index}
            title={item.title}
            accessoryLeft={renderItemAccessory}
            onPress={() => {
                props.onPress(props.user_id);
            }}
        />
    };

    return (
        <List
            style={styles.container}
            data={data}
            renderItem={renderItem}
            ItemSeparatorComponent={Divider}
            scrollEnabled={false}
        />
    )
}

const styles = StyleSheet.create({
    textDisabled: {
        color: '#919293'
    }
});