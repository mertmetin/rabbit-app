import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import http from './Http';

// Push notifications about orders (sent by the server through Expo's push
// service). Shown even while the app is open.
Notifications.setNotificationHandler({
    handleNotification: async () => ({ shouldShowBanner: true, shouldShowList: true, shouldPlaySound: true, shouldSetBadge: false }),
});

let registered = null;

// Registers this phone for the signed-in customer's notifications. `ask`
// shows the permission prompt (we ask right after an order, when it's
// obviously useful); otherwise only an earlier "yes" is used. Needs the EAS
// project id (app.json extra.eas.projectId) and a real device or simulator.
export async function registerForPush({ ask = false } = {}) {
    if (Platform.OS === 'web')
        return null;
    try {
        let { status } = await Notifications.getPermissionsAsync();
        if (status !== 'granted' && ask)
            ({ status } = await Notifications.requestPermissionsAsync());
        if (status !== 'granted')
            return null;

        const projectId = Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;
        if (!projectId) {
            if (__DEV__) console.log('Push: no EAS project id yet (run eas init).');
            return null;
        }
        const { data: token } = await Notifications.getExpoPushTokenAsync({ projectId });
        await http.post('user/push-token', { token, app: 'customer' });
        registered = token;
        return token;
    } catch (err) {
        if (__DEV__) console.log('Push registration failed', err?.message);
        return null;
    }
}

// Signing out: this phone stops getting that account's notifications.
export async function unregisterForPush() {
    if (!registered)
        return;
    const token = registered;
    registered = null;
    await http.delete('user/push-token', { data: { token } }).catch(() => {});
}
