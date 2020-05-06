import * as React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { AddCardForm } from '../../../components/Forms/Payment/AddCardForm';
import axios from 'axios';

export default function AddCardScreen({ navigation, route }) {
    const userId = route.params.userId;

    return(
        <ScrollView>
            <View style={styles.container}>
                <AddCardForm userId={userId} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
});