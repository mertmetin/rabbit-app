import * as React from 'react';
import { Layout, Button } from '@ui-kitten/components';
import { Link } from '../../../components/Link';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { LoginContainer } from '../../../components/Containers/LoginContainer';

export default function SignInScreen({ navigation }) {
    const onPress = () => {
        navigation.navigate('SignUp');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Layout level='1' style={styles.innerContainer}>
                <View>
                    <LoginContainer />
                    <Link value={'Forgot password?'} link={'PasswordResetScreen'} />
                </View>
                <View>
                    <Button onPress={onPress} appearance='outline' status='primary'>
                        Register
                    </Button>
                </View>
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
        flex: 1,
        justifyContent: 'space-between'
    }
});