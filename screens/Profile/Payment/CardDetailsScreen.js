import * as React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { CardDetailsForm } from '../../../components/Forms/Payment/CardDetailsForm';
import axios from 'axios';

export default function CardDetailsScreen({ navigation, route }) {
    const card = route.params.paymentMethod;

    return ( 
        <ScrollView style={styles.container}>
           <View>
                <CardDetailsForm card={card} /> 
           </View>
        </ScrollView>
    ); 
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
});