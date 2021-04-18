import * as React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import AddressDetailsForm from '../../../components/Forms/Address/AddressDetailsForm';

export default function AddressDetails({ navigation, route }) {
    // const userId = route.params.userId;
    // const address = route.params.address;

    return (
        <ScrollView>
            <View style={styles.container}>
                {/* <AddressDetailsForm userId={userId} address={address} /> */}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        // padding: 20
    }
});