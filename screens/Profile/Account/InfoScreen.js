import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Picker } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { showMessage, hideMessage } from "react-native-flash-message";
import { ActionButton } from '../../../components/ActionButton';
import { useNavigation } from '@react-navigation/native';
import { FloatingLabel } from '../../../components/FloatingLabel';
import http from '../../../helpers/Http';

export default function InfoScreen(props) {
    const user = props.route.params.data;
    const user_id = user.id;
    const [name, setName] = React.useState(user.name);
    const [email, setEmail] = React.useState(user.email);

    const onPress = () => {
        http.put(`users/${user_id}/`, {
            name: name,
            email: email
        })
        .then(res => {
            props.navigation.navigate('AccountScreen');
        }).catch(error => {
            const msg = error.response.data.message;
                showMessage({
                    message: msg,
                    type: "danger"
                });
            })
        }

    return (
        <ScrollView>
            <View style={styles.container}>
                <FloatingLabel label={'Name'} value={name} onTextChange={setName} />
                <FloatingLabel label={'Email'} value={email} onTextChange={setEmail} />
                <ActionButton title={'Save'} onPress={onPress} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
});