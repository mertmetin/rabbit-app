import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';

const getToken = async (callback) => {
    const token = await AsyncStorage.getItem('token');
    callback(JSON.parse(token));
};

const setToken = async (token) => {
    await AsyncStorage.setItem('token', JSON.stringify(token));
}

const removeToken = async => {
    AsyncStorage.removeItem('token');
}

const Token = {
    getToken: getToken,
    setToken: setToken,
    removeToken: removeToken
}

export default Token;
