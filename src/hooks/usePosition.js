import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

export const usePosition = ({ setPosition }) => {

    const getCurrentPosition = async () => {
        const { status } = await requestPermissionsAsync();
        const position = await getCurrentPositionAsync();

        setPosition(position);
    }

    return { getCurrentPosition };
}