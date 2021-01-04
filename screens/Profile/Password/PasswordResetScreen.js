import * as React from 'react';
import { Layout } from '@ui-kitten/components';
import { StyleSheet, SafeAreaView} from 'react-native';
import { PasswordResetForm } from '../../../components/Forms/Auth/PasswordResetForm';
import { PasswordResetContainer } from '../../../components/Containers/PasswordResetContainer';

export default function PasswordRecoveryScreen({ navigation, route }) {
    return (
        <SafeAreaView style={styles.container}>
            <Layout level='1' style={styles.innerContainer}>
                <PasswordResetContainer params={route.params} />
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