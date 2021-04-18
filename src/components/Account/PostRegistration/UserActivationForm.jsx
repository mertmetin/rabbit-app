import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Formik } from 'formik';
import { Layout, Input, Button } from '@ui-kitten/components';

import { Alert as AlertIcon } from '@/icons';
import { ErrorMessage } from '@/components/ErrorMessage';

export const UserActivationForm = ({ validationSchema, submitHandler, resendCode }) => {
    const initialValues = { token: '' };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={values => submitHandler(values)}
            validationSchema={validationSchema}
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
                    {errors.token && <ErrorMessage msg={errors.token} />}
                    <Button onPress={handleSubmit} style={styles.button} >
                        Activate
                    </Button>
                    <Button onPress={resendCode} style={styles.button} appearance='outline' >
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