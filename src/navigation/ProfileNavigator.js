import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/Auth/WelcomeScreen';
import PhoneScreen from '../screens/Auth/PhoneScreen';
import CodeScreen from '../screens/Auth/CodeScreen';
import ProfileSetupScreen from '../screens/Auth/ProfileSetupScreen';
import AddressScreen from '../screens/Profile/Address/AddressScreen';
import AddAddressScreen from '../screens/Profile/Address/AddAddressScreen';
import AccountScreen from '../screens/Profile/Account/AccountScreen';
import OrdersScreen from '../screens/Profile/Orders/OrdersScreen';
import InfoScreen from '../screens/Profile/Account/InfoScreen';
import CardsScreen from '../screens/Profile/Payment/PaymentMethodsScreen';
import { screenOptions } from './screenOptions';
import OrderTrackingScreen from '../screens/Orders/OrderTrackingScreen';
import FavoritesScreen from '../screens/Profile/Favorites/FavoritesScreen';
import HelpScreen from '../screens/Profile/Help/HelpScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';

const Stack = createStackNavigator();

export default function ProfileNavigator() {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="AccountScreen" component={AccountScreen} options={{ title: 'Profile', headerLeft: null }} />
            <Stack.Screen name="SignIn" component={WelcomeScreen} options={{ presentation: 'modal', headerShown: false }} />
            <Stack.Screen name="PhoneSignIn" component={PhoneScreen} options={{ title: 'Log in or sign up' }} />
            <Stack.Screen name="VerifyCode" component={CodeScreen} options={{ title: 'Verify your number' }} />
            <Stack.Screen name="CompleteProfile" component={ProfileSetupScreen} options={{ title: 'Your details', headerLeft: () => null, gestureEnabled: false }} />
            <Stack.Screen name="CardsScreen" component={CardsScreen} options={{ title: 'Payment methods' }} />
            <Stack.Screen name="AddressScreen" component={AddressScreen} options={{ title: 'Addresses' }} />
            <Stack.Screen name="AddAddressScreen" component={AddAddressScreen} options={{ title: 'Add Address' }} />
            <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} options={{ title: 'Your order' }} />
            <Stack.Screen name="OrdersScreen" component={OrdersScreen} options={{ title: 'Previous orders' }} />
            <Stack.Screen name="InfoScreen" component={InfoScreen} options={{ title: 'Personal info' }} />
            <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} options={{ title: 'Favorites' }} />
            <Stack.Screen name="HelpScreen" component={HelpScreen} options={{ title: 'Help' }} />
            <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: 'Product Details' }} />
        </Stack.Navigator>
    );
}
