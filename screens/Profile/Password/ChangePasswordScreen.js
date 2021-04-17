import * as React from 'react';
import { Layout } from '@ui-kitten/components';
import { Link } from '../../../components/Link';
import { StyleSheet, SafeAreaView } from 'react-native';
import { PasswordChange } from '../../../components/Account/PasswordChange';

export default function ChangePasswordScreen({ navigation, route }) {
    const userId = route.params.id;

    return (
        <SafeAreaView style={styles.container}>
            <Layout level='1' style={styles.innerContainer}>
                <PasswordChange userId={userId} />
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