import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import ChooseAddressScreen from '../screens/ChooseAddressScreen';

const Stack = createStackNavigator();

export default function HomeNavigator({ navigation }) {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Order' }} />
            <Stack.Screen name="Products" component={ProductsScreen} options={{ title: 'Products' }} />
            <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: 'Product Details' }} />
            <Stack.Screen name="ChooseAddress" component={ChooseAddressScreen} options={{ title: 'Choose Address' }} />
        </Stack.Navigator>
    );
}

const screenOptions = {
    headerShown: true,
    headerStyle: {
        backgroundColor: '#fff',
    },
    headerTintColor: '#18191A',
    headerTitleStyle: {
        fontWeight: 'bold',
        fontFamily: 'sodo-sans-bold',
        fontSize: 16
    }
}