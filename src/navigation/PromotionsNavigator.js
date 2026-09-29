import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PromotionsScreen from '../screens/Promotions/PromotionsScreen';
import PromotionDetailsScreen from '../screens/Promotions/PromotionDetailsScreen';
import { screenOptions } from './screenOptions';

const Stack = createStackNavigator();

export default function PromotionsNavigator({ navigation }) {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="PromotionsScreen" component={PromotionsScreen} options={{ title: 'Promotions' }} />
            <Stack.Screen name="PromotionDetailsScreen" component={PromotionDetailsScreen} options={{ title: 'Promotion Details' }} />
        </Stack.Navigator>
    );
}
