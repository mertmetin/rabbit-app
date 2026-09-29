import * as React from 'react';
import { Layout } from '@ui-kitten/components';
import { StyleSheet, SafeAreaView } from 'react-native';
import { AddUserAddress } from '@/components/Address/AddUserAddress';

export default function AddAddressScreen({ navigation, route }) {
    const data = route.params.data;

    return (
        <SafeAreaView style={styles.container}>
            <Layout level='1' style={styles.innerContainer}>
                <AddUserAddress data={data} />
            </Layout>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    }
});