import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const PasswordToggle = ({ secureTextEntry, setSecureTextEntry}) => {
    const pressHandler = () => setSecureTextEntry(!secureTextEntry);

    return (
        <TouchableWithoutFeedback onPress={pressHandler}>
            <Ionicons size={24} name={secureTextEntry ? 'md-eye' : 'md-eye-off'} />
        </TouchableWithoutFeedback>
    )
}