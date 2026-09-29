import * as React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";
import { CategoriesList } from '../components/Lists/CategoriesList';
import { ProductsCards } from '../components/Cards/ProductsCards';

export default function ProductsScreen({navigation, route}) {
    const category = route.params.item.id;
    const storeId = route.params.storeId;

    return(
        <View>
            <CategoriesList category={category} storeId={storeId}/>
            <ProductsCards category={category} storeId={storeId} />
        </View>
    );
}
