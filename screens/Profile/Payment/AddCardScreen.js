import * as React from 'react';
import { Layout, Button } from '@ui-kitten/components';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { AddCardContainer } from '../../../components/Containers/AddCardContainer';

export default function AddCardScreen({ navigation, route }) {
    const user_id = route.params.user_id;
    const setShouldFetch = route.params.setShouldFetch;

    return(
        <SafeAreaView>
            <Layout level='1' style={styles.container}>
                <AddCardContainer user_id={user_id} setShouldFetch={setShouldFetch} />
            </Layout>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
    }
});