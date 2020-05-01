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
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Account' }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
            <Stack.Screen name="UserActivation" component={UserActivation} options={{ title: 'Activate' }} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title: 'Forgot Password' }} />
            <Stack.Screen name="PasswordReset" component={PasswordReset} options={{ title: 'Reset Password' }} />
            <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{ title: 'Change Password' }} />
            <Stack.Screen name="CardsScreen" component={CardsScreen} options={{ title: 'Payment' }} />
            <Stack.Screen name="CardDetailsScreen" component={CardDetailsScreen} options={{ title: 'Card Details' }} />
            <Stack.Screen name="AddCardScreen" component={AddCardScreen} options={{ title: 'Add Card' }} />
            <Stack.Screen name="AddressScreen" component={AddressScreen} options={{ title: 'Addresses' }} />
            <Stack.Screen name="AddressDetails" component={AddressDetails} options={{ title: 'Address Details' }} />
            <Stack.Screen name="AddAddressScreen" component={AddAddressScreen} options={{ title: 'Add Address' }} />
            <Stack.Screen name="AccountScreen" component={AccountScreen} options={{ title: 'Profile' }} />
            <Stack.Screen name="InfoScreen" component={InfoScreen} options={{ title: 'Personal info' }} />
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