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
        flex: 1,
        padding: 20,
        backgroundColor: 'rgb(254, 254, 254)',
        height: '100%'
    }
})