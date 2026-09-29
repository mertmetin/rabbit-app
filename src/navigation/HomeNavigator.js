import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import AddressScreen from '../screens/Profile/Address/AddressScreen';
import AddAddressScreen from '../screens/Profile/Address/AddAddressScreen';
import { TransitionSpecs, HeaderStyleInterpolators } from '@react-navigation/stack';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

export default function HomeNavigator() {
    const MyTransition = {
        gestureDirection: 'vertical',
        transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
        },
        headerStyleInterpolator: HeaderStyleInterpolators.forFade,
    }


    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="Home" component={HomeScreen} options={{
                title: 'Order', headerLeft: null }} />
            <Stack.Screen name="Products" component={ProductsScreen} options={{ title: 'Products' }} />
            <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: 'Product Details' }} />
            <Stack.Screen name="AddAddressScreen" component={AddAddressScreen} options={{ title: 'Add Address' }} />
            <Stack.Screen name="ChooseAddress" component={AddressScreen} options={({ navigation }) => ({
                title: 'Delivery address', headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingLeft: 10}}>
                        <Ionicons
                            name={'close'}
                            size={24}
                        />
                    </TouchableOpacity>
  
                ) })} />
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