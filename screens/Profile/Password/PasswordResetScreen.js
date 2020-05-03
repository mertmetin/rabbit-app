import * as React from 'react';
import { StyleSheet, ScrollView, View} from 'react-native';
import { PasswordResetForm } from '../../../components/Forms/Auth/PasswordResetForm';
import axios from 'axios';

export default function PasswordRecoveryScreen({ navigation, route }) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View>
                <PasswordResetForm />
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