import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CartScreen from '../screens/Cart/CartScreen';
import CheckoutScreen from '../screens/Cart/CheckoutScreen';
import OrderPlacedScreen from '../screens/Cart/OrderPlacedScreen';
import AddressScreen from '../screens/Profile/Address/AddressScreen';
import AddAddressScreen from '../screens/Profile/Address/AddAddressScreen';
import { screenOptions } from './screenOptions';

const Stack = createStackNavigator();

export default function HomeNavigator({ navigation }) {
    return (
        <Stack.Navigator screenOptions={{ ...screenOptions, headerRight: () => null }}>
            <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Basket' }} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Checkout' }} />
            <Stack.Screen name="OrderPlaced" component={OrderPlacedScreen} options={{ title: 'Thank you' }} />
            <Stack.Screen name="AddressScreen" component={AddressScreen} options={{ title: 'Delivery address' }} />
            <Stack.Screen name="AddAddressScreen" component={AddAddressScreen} options={{ title: 'Add Address' }} />
        </Stack.Navigator>
    );
}
