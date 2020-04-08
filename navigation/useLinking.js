import { useLinking } from '@react-navigation/native';
import { Linking } from 'expo';

export default function(containerRef) {
  return useLinking(containerRef, {
    prefixes: [Linking.makeUrl('/')],
    config: {
      Root: {
        path: 'root',
        screens: {
          Home: 'home',
          Profile: 'profile',
          Gift: 'gift',
        },
      },
      Profile: {
        path: 'profile',
        screens: {
          ProfileHome: 'profilehome'
        }
      }
    },
  });
}
