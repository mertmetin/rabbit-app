import * as React from 'react';
import { StyleSheet, Text, ScrollView, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { UserActivationForm } from '../../../components/Forms/Auth/UserActivationForm';

export default function PostSignUpScreen({navigation, route}) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.subContainer}>
                <UserActivationForm navigateTo={'AccountScreen'} params={route.params} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'rgb(254, 254, 254)'
    }
});