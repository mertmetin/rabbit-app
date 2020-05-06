import * as React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { ChangePasswordForm } from '../../../components/Forms/Auth/ChangePasswordForm';

export default function ChangePasswordScreen({ navigation, route }) {
    const userId = route.params.data;

    return (
        <ScrollView style={styles.container}>
            <View>  
                <ChangePasswordForm userId={userId} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fafafa',
    }
});