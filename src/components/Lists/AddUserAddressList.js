import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Divider, List, Button, ListItem, Menu, MenuItem, Avatar } from '@ui-kitten/components';

const data = [
    {
        title: 'Add home address',
        type: 'Home',
        icon: 'home-outline',
    },
    {
        title: 'Add work address',
        type: 'Work',
        icon: 'business-outline',
    },
    {
        title: 'Add other address',
        type: 'Other',
        icon: 'trail-sign-outline',
    }
];

export const AddUserAddressList = (props) => {
    const renderItemAccessory = (props) => (
        <Ionicons color={'#3154fe'} style={{paddingRight: 15}} size={24} name='add' />
    );

    const renderItem = ({ item, index }) => {
        return <ListItem
            key={index}
            title={
                <React.Fragment>
                    <Ionicons size={20} {...props} name={item.icon} />
                    <Text style={{ fontSize: 20, fontWeight: '200', }}> | </Text>
                    <Text>{item.title}</Text>
                </React.Fragment>
            }
            accessoryRight={renderItemAccessory}
            onPress={() => {
                props.onPress(item);
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