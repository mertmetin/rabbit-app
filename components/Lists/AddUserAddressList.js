import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Divider, List, Button, ListItem, Menu, MenuItem, Avatar } from '@ui-kitten/components';

const data = [
    {
        title: 'Add home address',
        icon: 'home-outline',
    },
    {
        title: 'Add work address',
        icon: 'business-outline',
    },
    {
        title: 'Add other address',
        icon: 'trail-sign-outline',
    }
];

export const AddUserAddressList = (props) => {
    const renderItemAccessory = (address_id) => {
        return <Button onPress={() => props.onPress(address_id)} size='tiny'>
            <Ionicons size={24} name='add' />
        </Button>
    };

    const renderItem = ({ item, index }) => {
        return <ListItem
            title={
                <React.Fragment>
                    <Ionicons size={20} {...props} name={item.icon} />
                    <Text style={{ fontSize: 20, fontWeight: '200', }}> | </Text>
                    <Text>{item.title}</Text>
                </React.Fragment>
            }
            accessoryRight={() => renderItemAccessory(item.id)}
        />
    };



    return (
        <List
            style={styles.container}
            data={data}
            renderItem={renderItem}
            ItemSeparatorComponent={Divider}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        maxHeight: 180,
    },
    textDisabled: {
        color: '#919293'
    }
});