import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Navigate } from '@/icons';

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
