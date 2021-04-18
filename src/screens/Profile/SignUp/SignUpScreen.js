import * as React from 'react';
import { Link } from '../../../components/Link';
import { Layout, Button } from '@ui-kitten/components';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Registration } from '../../../components/Account/Registration';

export default function SignUpScreen({ navigation }) {
    const onPress = () => {
        navigation.navigate('SignUp');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Layout level='1' style={styles.innerContainer}>
                <Registration />
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