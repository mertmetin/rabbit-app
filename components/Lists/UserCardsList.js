import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Divider, List, Button, ListItem, Menu, MenuItem, Avatar } from '@ui-kitten/components';

export const UserCardsList = (props) => {
    const data = props.data;

    const renderItemAccessory = (payment_method_id) => {
        return <Button onPress={() => props.onPress(payment_method_id)} size='tiny' appearance={'ghost'} >
            <Ionicons size={24} name='trash-outline' />
        </Button>
    };

    const renderItemIcon = (item) => {
        var avatar = '';

        if (item.brand == 'Visa')
            avatar = <Avatar source={require('../../assets/images/visa-48.png')} />
        else if (item.brand == 'MasterCard')
            avatar = <Avatar source={require('../../assets/images/mastercard-48.png')} />

        return avatar;
    };

    const renderItem = ({ item, index }) => {
        return <ListItem
            key={index}
            title={`**** **** **** ${item.last4}`}
            accessoryLeft={() => {
                return renderItemIcon(item)
            }}
            accessoryRight={() => renderItemAccessory(item.payment_method_id)}
        />
    }

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