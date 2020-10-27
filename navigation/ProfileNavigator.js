import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SignInScreen from '../screens/Profile/SignIn/SignInScreen';
import SignUpScreen from '../screens/Profile/SignUp/SignUpScreen';
import PostSignUpScreen from '../screens/Profile/SignUp/PostSignUpScreen';
import PasswordResetScreen from '../screens/Profile/Password/PasswordResetScreen';
import PasswordRecoveryScreen from '../screens/Profile/Password/PasswordRecoveryScreen';
import ChangePasswordScreen from '../screens/Profile/Password/ChangePasswordScreen';
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
            <Stack.Screen name="AccountScreen" component={AccountScreen} options={{ title: 'Account' }} />
            <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Sign in' }} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Register' }} />
            <Stack.Screen name="PostSignUpScreen" component={PostSignUpScreen} options={{ title: 'Activate' }} />
            <Stack.Screen name="PasswordResetScreen" component={PasswordResetScreen} options={{ title: 'Forgot Password' }} />
            <Stack.Screen name="PasswordRecoveryScreen" component={PasswordRecoveryScreen} options={{ title: 'Reset Password' }} />
            <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{ title: 'Change Password' }} />
            <Stack.Screen name="CardsScreen" component={CardsScreen} options={{ title: 'Payment' }} />
            <Stack.Screen name="CardDetailsScreen" component={CardDetailsScreen} options={{ title: 'Card Details' }} />
            <Stack.Screen name="AddCardScreen" component={AddCardScreen} options={{ title: 'Add Card' }} />
            <Stack.Screen name="AddressScreen" component={AddressScreen} options={{ title: 'Addresses' }} />
            <Stack.Screen name="AddressDetails" component={AddressDetails} options={{ title: 'Address Details' }} />
            <Stack.Screen name="AddAddressScreen" component={AddAddressScreen} options={{ title: 'Add Address' }} />
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