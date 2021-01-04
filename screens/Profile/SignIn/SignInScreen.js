import * as React from 'react';
import { Layout } from '@ui-kitten/components';
import { Link } from '../../../components/Link';
import { StyleSheet, SafeAreaView } from 'react-native';
import { LoginContainer } from '../../../components/Containers/LoginContainer';

export default function SignInScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Layout level='1' style={styles.innerContainer}>
                <LoginContainer />
                <Link value={'Forgot password?'} link={'PasswordResetScreen'} />
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