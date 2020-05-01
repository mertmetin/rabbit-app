import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeNavigator from './HomeNavigator';
import SearchNavigator from './SearchNavigator';
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
        options={{
          title: 'Order',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-cart" />,
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchNavigator}
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-search" />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-person" />,
        }
      }
      />
      <BottomTab.Screen
        name="Promotions"
        component={PromotionsNavigator}
        options={{
          title: 'Promotions',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-gift" />,
        }}
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
