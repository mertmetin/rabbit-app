import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PromotionsScreen from '../screens/PromotionsScreen';

const Stack = createStackNavigator();

export default function PromotionsNavigator({ navigation }) {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="Search" component={PromotionsScreen} options={{ title: 'Promotions' }} />
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