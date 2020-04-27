import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import UserActivation from '../screens/UserActivationScreen';
import ForgotPassword from '../screens/ForgotPassword';
import PasswordReset from '../screens/PasswordReset';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import AddressScreen from '../screens/Profile/Address/AddressScreen';
import AddAddressScreen from '../screens/Profile/Address/AddAddressScreen';
import AddressDetails from '../screens/Profile/Address/AddressDetails';
import AccountScreen from '../screens/Profile/Account/AccountScreen';
import InfoScreen from '../screens/Profile/Account/InfoScreen';
import CardsScreen from '../screens/Profile/Payment/CardsScreen';
import CardDetailsScreen from '../screens/Profile/Payment/CardDetailsScreen';
import AddCardScreen from '../screens/Profile/Payment/AddCardScreen';

const Stack = createStackNavigator();

export default function ProfileNavigator({ navigation }) {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="UserActivation" component={UserActivation} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="PasswordReset" component={PasswordReset} />
            <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
            <Stack.Screen name="CardsScreen" component={CardsScreen} />
            <Stack.Screen name="CardDetailsScreen" component={CardDetailsScreen} />
            <Stack.Screen name="AddCardScreen" component={AddCardScreen} />
            <Stack.Screen name="AddressScreen" component={AddressScreen} />
            <Stack.Screen name="AddressDetails" component={AddressDetails} />
            <Stack.Screen name="AddAddressScreen" component={AddAddressScreen} />
            <Stack.Screen name="AccountScreen" component={AccountScreen} />
            <Stack.Screen name="InfoScreen" component={InfoScreen} />
        </Stack.Navigator>
    );
}

const screenOptions = {
    headerShown: false
}