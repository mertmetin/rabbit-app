import * as React from 'react';
import { Layout } from '@ui-kitten/components';
import { StyleSheet, SafeAreaView} from 'react-native';
import { PasswordReset } from '../../../components/Account/PasswordReset';

export default function PasswordRecoveryScreen({ navigation, route }) {
    return (
        <SafeAreaView style={styles.container}>
            <Layout level='1' style={styles.innerContainer}>
                <PasswordReset params={route.params} />
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