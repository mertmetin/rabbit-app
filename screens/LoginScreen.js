import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

export default function LoginScreen({ navigation }) {
    const [phoneNumber, onChangeText] = React.useState('Phone Number');
    // const [password, onChangeText] = React.useState('Phone Number');

    return (
        <View style={viewStyle.containerStyle}>
            <TextInput
                style={styles.input}
                placeholder="Phone Number" />
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Password (min 4 characters)"
            />
            <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}> Login </Text>
            </TouchableOpacity>
            <Button>
                Forgot Password
            </Button>
        </View>
    );
}

function OptionButton({ icon, label, onPress, isLastOption }) {
    return (
        <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.optionIconContainer}>
                    <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
                </View>
                <View style={styles.optionTextContainer}>
                    <Text style={styles.optionText}>{label}</Text>
                </View>
            </View>
        </RectButton>
    );
}

const viewStyle = StyleSheet.create({
    containerStyle: {
        marginTop: 25,
        marginBottom: 25,
        backgroundColor: 'rgb(254, 254, 254)'
    }
});

const styles = StyleSheet.create({
    container: {
        paddingTop: 23
    },
    input: {
        margin: 15,
        padding:15,
        height: 50,
        borderRadius: 5,
        borderColor: '#cacaca',
        borderWidth: 1
    },
    submitButton: {
        borderRadius: 5,
        backgroundColor: '#7a42f4',
        padding: 10,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        height: 50,
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        alignItems: 'center'
    }
})