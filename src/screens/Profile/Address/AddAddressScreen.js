import * as React from 'react';
import { Layout } from '@ui-kitten/components';
import { StyleSheet, SafeAreaView } from 'react-native';
// import { AddAddressForm } from '../../../components/Forms/Address/AddAddressForm';
import { AddUserAddressContainer } from '../../../components/Containers/AddUserAddressContainer';

export default function AddAddressScreen({ navigation, route }) {
    const data = route.params.data;

    return (
        <SafeAreaView style={styles.container}>
            <Layout level='1' style={styles.innerContainer}>
                <AddUserAddressContainer data={data} />
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