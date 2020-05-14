import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CartScreen from '../screens/Cart/CartScreen';

const Stack = createStackNavigator();

export default function HomeNavigator({ navigation }) {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Cart' }} />
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