import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CartScreen from '../screens/Cart/CartScreen';
import { screenOptions } from './screenOptions';

const Stack = createStackNavigator();

export default function HomeNavigator({ navigation }) {
    return (
        <Stack.Navigator screenOptions={{ ...screenOptions, headerRight: () => null }}>
            <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Basket' }} />
        </Stack.Navigator>
    );
}
