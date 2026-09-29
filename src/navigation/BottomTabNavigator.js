import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import HomeNavigator from './HomeNavigator';
import SearchNavigator from './SearchNavigator';
import CartNavigator from './CartNavigator';
import ProfileNavigator from './ProfileNavigator';
import PromotionsNavigator from './PromotionsNavigator';
import Colors from '../constants/Colors';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator() {

  const getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    const showOnScreens = [
      'Home',
      'CartScreen', 
      'AccountScreen', 
      'PromotionsScreen'
    ];

    if (!routeName || showOnScreens.includes(routeName) )
      return true;

    return false;
  }

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME} screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: Colors.tabIconSelected,
      tabBarLabelStyle: {
        fontSize: 12,
        fontFamily: 'sodo-sans-semibold',
      }
    }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={({ route }) => ({
          // title: 'Order',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="home" />,
          tabBarStyle: getTabBarVisibility(route) ? undefined : { display: 'none' }
        })}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchNavigator}
        options={({ route }) => ({
          // title: 'Search',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="search" />,
          tabBarStyle: getTabBarVisibility(route) ? undefined : { display: 'none' }
        })}
      />
      <BottomTab.Screen
        name="Cart"
        component={CartNavigator}
        options={({ route }) => ({
          // title: 'Cart',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="cart" />,
          tabBarStyle: getTabBarVisibility(route) ? undefined : { display: 'none' }
        })}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={({ route }) => ({
          // title: 'Profile',
          popToTopOnBlur: true,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="person" />,
          tabBarStyle: getTabBarVisibility(route) ? undefined : { display: 'none' }
        })}
      />
      <BottomTab.Screen
        name="Promotions"
        component={PromotionsNavigator}
        options={({ route }) => ({
          // title: 'Promotions',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="gift" />,
          tabBarStyle: getTabBarVisibility(route) ? undefined : { display: 'none' }
        })}
      />
    </BottomTab.Navigator>
  );
}
