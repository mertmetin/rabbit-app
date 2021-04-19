import {requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location';

export const useGpsLocation = async () => {
    const { status } = await Location.requestPermissionsAsync();
    const location = await Location.getCurrentPositionAsync();

    return {
        status,
        location,
    }
}