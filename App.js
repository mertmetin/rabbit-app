import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { registerForPush } from './src/helpers/Push';
import { getCurrentUser } from './src/helpers/Auth';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import FlashMessage from "react-native-flash-message";
import { Provider } from 'react-redux'
import store from './store'
import { StripeProvider } from '@stripe/stripe-react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FlyToCartProvider } from './src/context/FlyToCart';

import * as eva from '@eva-design/eva';
// import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider } from '@ui-kitten/components';

const Stack = createStackNavigator();

// Lets notification taps navigate from outside a screen.
const navigationRef = createNavigationContainerRef();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        // await Font.loadAsync({
        //   ...Ionicons.font,
        //   'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        // });
        await Font.loadAsync({
          ...Ionicons.font,
          'sodo-sans-bold': require('./assets/fonts/SoDoSans-Bold.ttf'),
          'sodo-sans-semibold': require('./assets/fonts/SoDoSans-SemiBold.ttf'),
          'sodo-sans-regular': require('./assets/fonts/SoDoSans-Regular.ttf'),
          'lander-grande-book': require('./assets/fonts/LanderGrande/LanderGrande-Book.ttf'),
          'lander-grande-bold': require('./assets/fonts/LanderGrande/LanderGrande-Bold.ttf'),
          'lander-grande-semibold': require('./assets/fonts/LanderGrande/LanderGrande-SemiBold.ttf'),
          'lander-grande-regular': require('./assets/fonts/LanderGrande/LanderGrande-Regular.ttf'),
          'lander-grande-light': require('./assets/fonts/LanderGrande/LanderGrande-Light.ttf')
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  // Notifications: re-register this phone if the customer said yes before, and
  // open the order when one is tapped (also when it launched the app).
  React.useEffect(() => {
    getCurrentUser().then((user) => user && registerForPush());
    const openOrder = (response) => {
      const orderId = response?.notification?.request?.content?.data?.order_id;
      if (!orderId) return;
      const go = () => navigationRef.navigate('Root', { screen: 'Home', params: { screen: 'OrderTracking', params: { orderId } } });
      navigationRef.isReady() ? go() : setTimeout(go, 800);
    };
    Notifications.getLastNotificationResponseAsync().then(openOrder);
    const sub = Notifications.addNotificationResponseReceivedListener(openOrder);
    return () => sub.remove();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <ApplicationProvider {...eva} theme={eva.light}>
       {/* <IconRegistry icons={EvaIconsPack} /> */}
        <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY} urlScheme="rabbit">
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <SafeAreaProvider>
            <FlyToCartProvider>
            <NavigationContainer ref={navigationRef}>
              <Stack.Navigator>
                <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
              </Stack.Navigator>
            </NavigationContainer>
            </FlyToCartProvider>
            </SafeAreaProvider>
            <FlashMessage position="top" />
          </View>
        </Provider>
        </StripeProvider>
      </ApplicationProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
