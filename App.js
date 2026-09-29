import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import FlashMessage from "react-native-flash-message";
import { Provider } from 'react-redux'
import store from './store'

import * as eva from '@eva-design/eva';
// import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider } from '@ui-kitten/components';

const Stack = createStackNavigator();

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

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <ApplicationProvider {...eva} theme={eva.light}>
       {/* <IconRegistry icons={EvaIconsPack} /> */}
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
              </Stack.Navigator>
            </NavigationContainer>
            <FlashMessage position="top" />
          </View>
        </Provider>
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
