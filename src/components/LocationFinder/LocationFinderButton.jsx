import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Navigate } from '@/icons';

import { ListItem } from '@ui-kitten/components';


export const LocationFinderButton = ({ submitHandler }) => {
    const NavigateIcon = () =>  <Navigate size={24} />

    return (
        <ListItem
            key={"use-current-location"}
            style={styles.box_shadow}                    
            title={'Use current location'}
            accessoryLeft={NavigateIcon}
            onPress={submitHandler}
        />
    );
}

const styles = StyleSheet.create({
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