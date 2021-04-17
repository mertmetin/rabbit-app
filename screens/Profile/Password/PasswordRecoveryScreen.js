import * as React from 'react';
import { Layout } from '@ui-kitten/components';
import { StyleSheet, ScrollView, SafeAreaView, View } from 'react-native';
import { PasswordRecovery } from '../../../components/Account/PasswordRecovery';


export default function PasswordResetScreen({ navigation, route }) {
    return (
        <SafeAreaView style={styles.container}>
            <Layout level='1' style={styles.innerContainer}>
                <PasswordRecovery params={route.params} />
            </Layout>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },  
    innerContainer: {
        padding: 20,
    }
});