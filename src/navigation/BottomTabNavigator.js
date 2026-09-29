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

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
    navigation.setOptions({ 
      // headerTitle: getHeaderTitle(route) 
         headerShown: false
      }
    );

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
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME} tabBarOptions={{
      activeTintColor: Colors.tabIconSelected,
      labelStyle: {
        fontSize: 12,
        fontFamily: 'sodo-sans-semibold',
      }
    }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={({ route }) => ({
          // title: 'Order',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
          tabBarVisible: getTabBarVisibility(route)
        })}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchNavigator}
        options={({ route }) => ({
          // title: 'Search',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-search" />,
          tabBarVisible: getTabBarVisibility(route)
        })}
      />
      <BottomTab.Screen
        name="Cart"
        component={CartNavigator}
        options={({ route }) => ({
          // title: 'Cart',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-cart" />,
          tabBarVisible: getTabBarVisibility(route)
        })}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={({ route }) => ({
          // title: 'Profile',
          unmountOnBlur:true,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-person" />,
          tabBarVisible: getTabBarVisibility(route)
        })}
      />
      <BottomTab.Screen
        name="Promotions"
        component={PromotionsNavigator}
        options={({ route }) => ({
          // title: 'Promotions',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-gift" />,
          tabBarVisible: getTabBarVisibility(route)
        })}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'How to get started';
    case 'Search':
      return 'Search';
    case 'Profile':
      return 'Profile';
    case 'Gift':
      return 'Links to learn more';
  }
}
