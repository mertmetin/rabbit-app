import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, List, ListItem, Divider } from '@ui-kitten/components';

export const AutocompletePopper = ({ data, leftIcon, onItemSelected }) => {
    
    const renderItem = ({ item }) => (
        <ListItem
            title={() => <Text style={styles.textDisabled}>{item.description}</Text>}
            accessoryLeft={leftIcon}
            onPress={() => onItemSelected(item)}
        />
    );

    return (
        <List
            data={data}
            ItemSeparatorComponent={Divider}
            renderItem={renderItem}
        />
    );
}

const styles = StyleSheet.create({
    textStyle: {
        fontWeight: '600'
    },
    field: {
        backgroundColor: '#fff',
        borderColor: '#fff'
    },
    textDisabled: {
        color: '#919293'
    }
});