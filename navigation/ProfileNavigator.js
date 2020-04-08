import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

export default function ProfileNavigator({ navigation }) {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="Home" component={ProfileScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    );
}

const screenOptions = {
    headerShown: false
}