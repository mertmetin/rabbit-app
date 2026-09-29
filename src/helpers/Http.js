import axios from 'axios';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// The API runs on port 3000 of the same machine as the Expo dev server, so
// derive its address from wherever the app was loaded. Set
// EXPO_PUBLIC_API_URL to point somewhere else (e.g. a deployed server).
function apiUrl() {
    if (process.env.EXPO_PUBLIC_API_URL)
        return process.env.EXPO_PUBLIC_API_URL;

    const host = Platform.OS === 'web'
        ? window.location.hostname
        : Constants.expoConfig?.hostUri?.split(':')[0];

    return `http://${host || 'localhost'}:3000/api/`;
}

const http = axios.create({
    baseURL: apiUrl(),
    timeout: 30000
});

http.interceptors.request.use(async config => {
    const token = await AsyncStorage.getItem('token');

    if (token)
        config.headers.Authorization = 'Bearer ' + JSON.parse(token);

    return config;
});

// Surface the server's `{ message }` as error.message, which is what
// most screens show to the user.
http.interceptors.response.use(
    response => response,
    error => {
        const message = error.response?.data?.message;
        if (message)
            error.message = message;
        return Promise.reject(error);
    }
);

export default http;
