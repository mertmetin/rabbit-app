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

export const API_URL = apiUrl();

const http = axios.create({
    baseURL: API_URL,
    timeout: 30000
});

http.interceptors.request.use(async config => {
    const token = await AsyncStorage.getItem('token');

    if (token)
        config.headers.Authorization = 'Bearer ' + JSON.parse(token);

    return config;
});

// Messages people can act on, instead of "Network Error" or a stack trace.
export const OFFLINE_MESSAGE = "Can't reach Rabbit. Check your internet connection and try again.";
export const SLOW_MESSAGE = 'Rabbit is taking too long to answer. Please try again.';
export const SERVER_MESSAGE = 'Something went wrong on our side. Please try again in a moment.';

// error.message is what screens show: the server's own `{ message }` when it
// sent one (written for people), otherwise one of the messages above.
http.interceptors.response.use(
    response => response,
    error => {
        const message = error.response?.data?.message;
        if (message && error.response.status < 500)
            error.message = message;
        else if (error.code === 'ECONNABORTED')
            error.message = SLOW_MESSAGE;
        else if (!error.response)
            error.message = OFFLINE_MESSAGE;
        else
            error.message = SERVER_MESSAGE;
        return Promise.reject(error);
    }
);

export default http;
