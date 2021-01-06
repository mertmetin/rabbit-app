import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Divider, List, Button, ListItem, Menu, MenuItem, Avatar } from '@ui-kitten/components';

export const UserAddressList = (props) => {
    const data = props.data;
    const renderItemAccessory = (address_id) => {
        return <Button onPress={() => props.onPress(address_id)} size='tiny'>
            <Ionicons size={24} name='trash-outline' />
        </Button>
    };

    const renderItem = ({ item, index }) => {
        var address_type = item.address_type.type;
        var icon = '';

        if (address_type == 'home')
            icon = 'home-outline';
        else if (address_type == 'work')
            icon = 'business-outline';
        else if (address_type == 'other')
            icon = 'trail-sign-outline';

        address_type = address_type.charAt(0).toUpperCase() + address_type.slice(1);

        return <ListItem
            title={
                <React.Fragment>
                    <Ionicons size={20} {...props} name={icon} />
                    <Text style={{ fontSize: 20, fontWeight: '200', }}> | </Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', }}>{address_type} </Text>
                    <Text style={styles.textDisabled}>{item.main_text}</Text>
                </React.Fragment>
            } 
            accessoryRight={() => renderItemAccessory(item.id)}
        />
    };

    return(
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