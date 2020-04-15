import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import UserActivation from '../screens/UserActivationScreen';
import ForgotPassword from '../screens/ForgotPassword';
import PasswordReset from '../screens/PasswordReset';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';

const Stack = createStackNavigator();

export default function ProfileNavigator({ navigation }) {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="Home" component={ProfileScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="UserActivation" component={UserActivation} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="PasswordReset" component={PasswordReset} />
            <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
        </Stack.Navigator>
    );
}

const screenOptions = {
    headerShown: false
}