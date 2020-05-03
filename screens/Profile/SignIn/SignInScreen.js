import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { showMessage, hideMessage } from "react-native-flash-message";
import { FloatingLabel } from '../../../components/FloatingLabel';
import { SignInForm } from '../../../components/Forms/Auth/SignInForm';

export default function SignInScreen({ navigation }) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View>
                <SignInForm navigateTo={'AccountScreen'} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'rgb(254, 254, 254)',
        display: 'flex',
        justifyContent: 'space-between',
        height: '100%'
    }
})