import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Divider, List, ListItem, Button, } from '@ui-kitten/components';

import { Trash as TrashIcon } from '@/icons';
import { getAddressIconByType } from '@/utils/address';

// ListItem passes style props to its title, so it must be a real View.
const getAddressTitle = (item) => (props) => (
    <View style={[props?.style, { flexDirection: 'row', alignItems: 'center' }]}>
        {(getAddressIconByType(item.icon))}
        <Text style={{ fontSize: 20, fontWeight: '200', }}> | </Text>
        <Text style={styles.textDisabled}>{item.label ? `${item.label} · ` : ''}{item.address_line_1}</Text>
    </View>
);

export const UserAddressesList = ({ data, submitHandler, deleteHandler }) => {
    const renderItemAccessory = (addressId) => (
        <Button onPress={() => deleteHandler(addressId)} size={'tiny'} appearance={'ghost'} >
            <TrashIcon size={24} />
        </Button>
    );

    const renderItem = ({ item, index }) => (
        <ListItem
            key={index}
            title={getAddressTitle(item)} 
            accessoryRight={() => renderItemAccessory(item.id)}
            onPress={() => submitHandler(item)}
        />
    );

    return(
        <List
            data={data}
            renderItem={renderItem}
            style={styles.container}
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