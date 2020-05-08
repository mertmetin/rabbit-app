import * as React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { ProductsCards } from '../components/Cards/ProductsCards';
import { showMessage, hideMessage } from "react-native-flash-message";

export default function ProductsScreen({navigation, route}) {
    const category = route.params.item.id;

    return(
        <ScrollView>
            <View>
                <ProductsCards category={category} />
            </View>
        </ScrollView>
    );
}
