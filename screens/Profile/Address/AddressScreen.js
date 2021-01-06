import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Picker, SafeAreaView } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { showMessage, hideMessage } from "react-native-flash-message";
// import { ActionButton } from '../../../components/ActionButton';
// import  UserAddressesList  from '../../../components/Lists/UserAddressesList';
import {UserAddressContainer} from '../../../components/Containers/UserAddressContainer';
import { AddUserAddressContainer } from '../../../components/Containers/AddUserAddressContainer';

import http from '../../../helpers/Http';

export default function AddressScreen({ navigation, route }) {
    const user_id = route.params.id;

    const onPress = () => {
        navigation.navigate('AddAddressScreen', {data: userId});
    }

    return(
        <SafeAreaView>
            <View style={styles.container}>
                <UserAddressContainer user_id={user_id} />
                <AddUserAddressContainer />
                {/* <UserAddressesList userId={userId} />
                <ActionButton title={'Add new'} onPress={onPress} /> */}
            </View>
        </SafeAreaView>
    ); 
}

const styles = StyleSheet.create({
    container: {
        // padding: 20,
        backgroundColor: '#f6f6f6'
    }
});