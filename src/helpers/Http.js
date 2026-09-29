import axios from 'axios';
import Token from './Token';
import { API_URL } from 'react-native-dotenv'
import AsyncStorage from '@react-native-async-storage/async-storage';

const config = { 
    baseURL: API_URL, 
    timeout: 60000,
    withCredentials: true
}
const http = axios.create(config);   

http.interceptors.request.use(
    async config => {
        var token = await AsyncStorage.getItem('token')

        if (token) {
            token = JSON.parse(token);
            config.headers.Authorization = "Bearer " + token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
);

export default http;