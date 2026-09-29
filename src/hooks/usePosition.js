import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

const PERMISSION_GRANTED = 'granted';

export const usePosition = () => {
    const getCurrentPosition = async () => {
        const { status } = await requestForegroundPermissionsAsync();
        const position = await getCurrentPositionAsync();
        const isGranted = status !== PERMISSION_GRANTED;

        if (isGranted) 
            return;

        return position;
    }

    return { getCurrentPosition };
}