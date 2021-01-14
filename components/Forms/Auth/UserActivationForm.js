import React from 'react';
import { StyleSheet, TextInput, View, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import { Layout, Input, Button, Text } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';

export const UserActivationForm = props => {
    const AlertIcon = (props) => (
        <Ionicons size={11} {...props} name='md-information-circle-outline' />
    );

    return (
        <Formik
            initialValues={{ token: ''}}
            onSubmit={values => props.onPress(values)}
            validationSchema={props.validationSchema}
        >
            {({ handleChange, handleBlur, handleSubmit, errors, values }) => (
                <View style={styles.container}>
                    <Input
                        style={styles.field}
                        placeholder='Enter token'
                        label='Token'
                        value={values.token}
                        textStyle={styles.textStyle}
                        caption={'Please type the activation code sent to your phone number'}
                        onChangeText={handleChange('token')}
                        size='large'
                        captionIcon={AlertIcon}
                    />
                    {errors.token &&
                        <Text style={{ fontSize: 12, color: 'red', alignSelf: 'flex-start' }}>{errors.token}</Text>
                    }
                    <Button onPress={handleSubmit} style={styles.button} >
                        Activate
                    </Button>
                    <Button onPress={props.resendCode} style={styles.button} appearance='outline' >
                        Resend Code
                    </Button>
                </View>
            )}
        </Formik>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        alignItems: 'center',
    },
    textStyle: {
        fontWeight: '600'
    },
    field: {
        marginTop: 5,
        marginBottom: 5
    },
    button: {
        flexDirection: 'row',
        marginTop: 20,
        alignSelf: 'stretch'
    }
});