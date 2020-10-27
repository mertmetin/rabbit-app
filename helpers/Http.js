import axios from 'axios';
import Token from './Token';
import { API_URL } from 'react-native-dotenv'

const config = { 
    baseURL: API_URL, 
    timeout: 1000,
    withCredentials: true
}
const http = axios.create(config);   

// Set JSON Web Token in Client to be included in all calls
export const setClientToken = token => {
    http.interceptors.request.use(function (config) {
        config.headers.Authorization = 'Bearer ' + token.token;

        return config;
    });
};

export default http;