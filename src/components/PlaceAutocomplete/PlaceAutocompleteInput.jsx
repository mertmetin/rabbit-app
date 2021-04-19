import React from 'react';
import { StyleSheet, TextInput, View, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import { Layout, Input, Button, Text, List, ListItem, Divider } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';

import { Search } from '@/icons';

export const PlaceAutocompleteInput = ({ searchTerm, setSearchTerm, changeHandler }) => {
    const SearchIcon = () => <Search size={24} />

    return (
        <Input
            style={styles.field}
            placeholder='Search Address'
            value={searchTerm}
            textStyle={styles.textStyle}
            onChangeText={(e) => {
                setSearchTerm(e);
                changeHandler(e);
            }}
            accessoryLeft={SearchIcon}
            size='large'
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
});