import * as React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { AddAddressForm } from '../../../components/Forms/Address/AddAddressForm';
import axios from 'axios';

export default function AddAddressScreen({ navigation, route }) {
    const userId = route.params.data;
    
    return (
        <ScrollView style={styles.container}>
            <View>
                <AddAddressForm userId={userId} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'rgb(254, 254, 254)',
    }
});