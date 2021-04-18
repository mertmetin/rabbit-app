import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Divider, Button, List, ListItem, Menu, MenuItem, Avatar } from '@ui-kitten/components';

export const AddressPredictionsList = (props) => {
    const data = props.predictions;
    const renderItemIcon = (props) => (
        <Ionicons size={24} {...props} name='location-outline' />
    );
    const renderItem = ({ item, index }) => (
        <ListItem
            title={() => {
                return <Text style={styles.textDisabled}>{item.description}</Text>
            }}
            accessoryLeft={renderItemIcon}
            onPress={() => {props.onPress(item)}}
        />
    );

    return <List
        style={styles.container}
        data={data}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
    />
}

const styles = StyleSheet.create({
    container: {
        // maxHeight: 192,
    },
    textDisabled: {
        color: '#919293',
        fontWeight: '500'
    }
});