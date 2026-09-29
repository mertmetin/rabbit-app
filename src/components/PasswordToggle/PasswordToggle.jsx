import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ICON_EYE_OPEN = 'eye';
const ICON_EYE_CLOSED = 'eye-off';

export const PasswordToggle = ({ secureTextEntry, setSecureTextEntry}) => {
    const pressHandler = () => setSecureTextEntry(!secureTextEntry);

    return (
        <TouchableWithoutFeedback onPress={pressHandler}>
            <Ionicons size={24} name={secureTextEntry ? ICON_EYE_OPEN : ICON_EYE_CLOSED} />
        </TouchableWithoutFeedback>
    )
}