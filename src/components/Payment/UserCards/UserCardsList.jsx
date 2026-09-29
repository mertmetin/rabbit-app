import React from 'react';
import { StyleSheet } from 'react-native';

import { Divider, List, Button, ListItem, Avatar } from '@ui-kitten/components';
import { Trash as TrashIcon } from '@/icons';

export const UserCardsList = ({ creditCards, deleteHandler }) => {
    const renderItemAccessory = (payment_method_id) => (
        <Button onPress={() => deleteHandler(payment_method_id)} size='tiny' appearance={'ghost'}>
            <TrashIcon size={24} />
        </Button>
    );

    const renderItemIcon = (item) => {
        var avatar = '';

        if (item.brand == 'Visa')
            avatar = <Avatar source={require('../../../../assets/images/visa-48.png')} />
        else if (item.brand == 'MasterCard')
            avatar = <Avatar source={require('../../../../assets/images/mastercard-48.png')} />

        return avatar;
    };

    const renderItem = ({ item, index }) => {
        return <ListItem
            key={index}
            title={`**** **** **** ${item.last4}`}
            accessoryLeft={() => renderItemIcon(item)}
            accessoryRight={() => renderItemAccessory(item.payment_method_id)}
        />
    }

    return (
        <List
            style={styles.container}
            data={creditCards}
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