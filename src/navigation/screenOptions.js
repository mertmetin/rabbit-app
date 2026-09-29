import * as React from 'react';
import { theme } from '../theme';
import { CartButton } from '../components/Cart/CartButton';

// Shared header: Rabbit green with the basket total on the right.
export const screenOptions = {
    headerShown: true,
    headerStyle: { backgroundColor: theme.primary },
    headerTintColor: theme.white,
    headerTitleAlign: 'center',
    headerBackButtonDisplayMode: 'minimal',
    headerTitleStyle: { fontFamily: theme.font.bold, fontSize: 17 },
    headerRight: () => <CartButton />,
};
