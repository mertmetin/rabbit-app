import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Divider, List, ListItem, Button, } from '@ui-kitten/components';

import { Trash as TrashIcon } from '@/icons';
import { getAddressIconByType } from '@/utils/address';

const getAddressTitle = (item) => {
    var addressType = item.address_type.type;
    const addressIcon = getAddressIconByType(addressType);
    addressType = addressType.charAt(0).toUpperCase() + addressType.slice(1);

    return (
        <>
            {addressIcon}
            <Text style={{ fontSize: 20, fontWeight: '200', }}> | </Text>
            <Text style={{ fontSize: 14, fontWeight: '600', }}>{addressType} </Text>
            <Text style={styles.textDisabled}>{item.address_line_1}</Text>
        </>
    );
}

export const UserAddressesList = ({ data, submitHandler, deleteHandler }) => {
    const renderItemAccessory = (address_id) => (
        <Button onPress={() => deleteHandler(address_id)} size={'tiny'} appearance={'ghost'} >
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