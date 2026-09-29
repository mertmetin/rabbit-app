import * as React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import HomeNavigator from './HomeNavigator';
import SearchNavigator from './SearchNavigator';
import CartNavigator from './CartNavigator';
import ProfileNavigator from './ProfileNavigator';
import PromotionsNavigator from './PromotionsNavigator';
import { MinOrderBar } from '../components/Cart/MinOrderBar';
import { useCart } from '../hooks/useCart';
import { theme } from '../theme';

const BottomTab = createBottomTabNavigator();

// Screens deeper in a tab (product details, forms…) hide the tab bar.
const TAB_BAR_SCREENS = ['Home', 'Search', 'Cart', 'AccountScreen', 'PromotionsScreen', 'Promotions', 'Products'];
const tabBarStyleFor = (route) => {
    const name = getFocusedRouteNameFromRoute(route);
    return !name || TAB_BAR_SCREENS.includes(name) ? styles.tabBar : { display: 'none' };
};

const icon = (name) => ({ focused }) => (
    <Ionicons name={focused ? name : `${name}-outline`} size={26} color={focused ? theme.primary : theme.muted} />
);

// The raised round basket in the middle of the tab bar.
function CartTabButton({ onPress }) {
    const { count } = useCart();
    return (
        <Pressable onPress={onPress} style={styles.cartButtonWrap}>
            <View style={styles.cartButton}>
                <Ionicons name="basket" size={30} color={theme.accent} />
                {count > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{count}</Text>
                    </View>
                )}
            </View>
        </Pressable>
    );
}

// Minimum-order progress sits just above the tabs, like a shelf.
function TabBarWithProgress(props) {
    const focused = props.state.routes[props.state.index];
    const hidden = tabBarStyleFor(focused).display === 'none';
    return (
        <View>
            {!hidden && <MinOrderBar />}
            <BottomTabBar {...props} />
        </View>
    );
}

export default function BottomTabNavigator() {
    return (
        <BottomTab.Navigator
            initialRouteName="Home"
            tabBar={(props) => <TabBarWithProgress {...props} />}
            screenOptions={{ headerShown: false, tabBarShowLabel: false }}
        >
            <BottomTab.Screen name="Home" component={HomeNavigator}
                options={({ route }) => ({ tabBarIcon: icon('home'), tabBarStyle: tabBarStyleFor(route) })} />
            <BottomTab.Screen name="Search" component={SearchNavigator}
                options={({ route }) => ({ tabBarIcon: icon('search'), tabBarStyle: tabBarStyleFor(route) })} />
            <BottomTab.Screen name="Cart" component={CartNavigator}
                options={({ route }) => ({
                    tabBarButton: (props) => <CartTabButton onPress={props.onPress} />,
                    tabBarStyle: tabBarStyleFor(route),
                })} />
            <BottomTab.Screen name="Profile" component={ProfileNavigator}
                options={({ route }) => ({ tabBarIcon: icon('person'), tabBarStyle: tabBarStyleFor(route), popToTopOnBlur: true })} />
            <BottomTab.Screen name="Promotions" component={PromotionsNavigator}
                options={({ route }) => ({ tabBarIcon: icon('gift'), tabBarStyle: tabBarStyleFor(route) })} />
        </BottomTab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: theme.white,
        borderTopColor: theme.border,
    },
    cartButtonWrap: {
        flex: 1,
        alignItems: 'center',
    },
    cartButton: {
        top: -18,
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: theme.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 4,
        borderColor: theme.white,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
    },
    badge: {
        position: 'absolute',
        top: 6,
        right: 6,
        minWidth: 20,
        height: 20,
        borderRadius: 10,
        paddingHorizontal: 5,
        backgroundColor: theme.accent,
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgeText: {
        color: theme.text,
        fontFamily: theme.font.bold,
        fontSize: 11,
    },
});
