import React from 'react';
import { StyleSheet, TextInput, View, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import { Layout, Input, Button, Text, List, ListItem, Divider } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';

export const PlaceSearchForm = props => {
    const [searchText, setSearchText] = React.useState('');

    const SearchIcon = (props) => (
        <Ionicons size={24} {...props} name='search' />
    );

    const NavigateIcon = (props) => (
        <Ionicons size={24} {...props} name='navigate' />
    );

    return (
        <Layout>
            <View>
                <Input
                    style={styles.field}
                    placeholder='Search Address'
                    value={searchText}
                    textStyle={styles.textStyle}
                    onChangeText={(e) => {
                        setSearchText(e);
                        props.onTextChange(e);
                    }}
                    accessoryLeft={SearchIcon}
                    size='large'
                />
                <Divider />
                <ListItem
                    style={styles.box_shadow}                    
                    title={'Use current location'}
                    accessoryLeft={NavigateIcon}
                    onPress={props.onPress}
                />
            </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F1F1F1'
        // marginTop: 10,
        // alignItems: 'center',
    },
    textStyle: {
        fontWeight: '600'
    },
    field: {
        // marginTop: 5,
        // marginBottom: 5,
        // elevation: 0,
        backgroundColor: '#fff',
        borderColor: '#fff'
    },
    button: {
        flexDirection: 'row',
        marginTop: 20,
        alignSelf: 'stretch'
    },
    box_shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
    }
});