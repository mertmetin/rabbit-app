import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
    try {
        const item = await AsyncStorage.getItem('token');
        var token = JSON.parse(item);

        return token;
    } catch (error) {
        console.log(error);
    }
}


const setToken = async (token) => {
    // try {
        await AsyncStorage.setItem('token', JSON.stringify(token));
    // } catch (e) {
    //     console.log('here');
    // }
}

const removeToken = async () => {
    // await AsyncStorage.removeItem('token');

    AsyncStorage.removeItem('token', (err) => {
        // key 'key' will be removed, if they existed
        // callback to do some action after removal of item
        console.log(err);
    });

}

const Token = {
    getToken: getToken,
    setToken: setToken,
    removeToken: removeToken
}

export default Token;
