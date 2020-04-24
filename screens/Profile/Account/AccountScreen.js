import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Picker } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { showMessage, hideMessage } from "react-native-flash-message";
import { OptionButton } from '../../../components/OptionButton';
import { ActionButton } from '../../../components/ActionButton';
import { useNavigation } from '@react-navigation/native';

export default function AccountScreen(props) {
    const user = props.user;
    const navigation = useNavigation();
    const onPress = () => {
        axios.post('http://localhost:8000/logout', {

        })
        .then(res => {
            props.setLogin(false);
            navigation.navigate('Profile');
        }).catch(error => {

        })
    };
        
    return (
        <ScrollView style={{
            backgroundColor: '#f6f6f6'}}>
            <View style={styles.container}>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.email}>{user.email}</Text>

                <View>
                    <Text style={styles.sectionContainer}>Profile</Text>
                    <OptionButton title={'Personal info'} routeName={'InfoScreen'} data={user}/>
                    <OptionButton title={'Addresses'} />
                    <OptionButton title={'Payment Methods'} />
                </View>
                <ActionButton title={'Log out'} onPress={onPress}/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingLeft: 15
    },  
    sectionContainer: {
        marginTop: 50, 
        fontSize: 18, 
        fontFamily: 'sodo-sans-semibold'
    },
    name: {
       fontSize: 24,
       fontFamily: 'sodo-sans-bold'
    },
    email: {
        fontSize: 12,
        fontFamily: 'sodo-sans-regular',
        marginTop: 5
    }
});