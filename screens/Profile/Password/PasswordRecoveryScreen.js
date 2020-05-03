import * as React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { PasswordRecoveryForm } from '../../../components/Forms/Auth/PasswordRecoveryForm';
import axios from 'axios';

export default function PasswordResetScreen({ navigation, route }) {
    console.log(route.params);
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View>
                <PasswordRecoveryForm params={route.params} />
            </View> 
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'rgb(254, 254, 254)'
    }
});