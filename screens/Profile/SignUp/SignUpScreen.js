import * as React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { SignUpForm } from '../../../components/Forms/Auth/SignUpForm';
import axios from 'axios';

export default function SignUpScreen({ navigation, route }) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View>
                <SignUpForm navigateTo={'PostSignUpScreen'}/>
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