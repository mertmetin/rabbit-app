import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import { Layout, Input, Button, Text } from '@ui-kitten/components';

import { PasswordToggle } from '@/components/PasswordToggle';
import { ErrorMessage } from '@/components/ErrorMessage';

export const PasswordRecoveryForm = ({ validationSchema, submitHandler, handleCodeResend }) => {
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);
    const passwordToggle = <PasswordToggle secureTextEntry={secureTextEntry} 
        setSecureTextEntry={setSecureTextEntry} />
    const initialValues = { token: '', password: '' };

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
                    placeholder='9950'
                    label='Token'
                    value={values.token}
                    textStyle={styles.textStyle}
                    onChangeText={handleChange('token')}
                    size='large'
                />
                {errors.token && <ErrorMessage msg={errors.token} />}\
                <Input
                    style={styles.field}
                    placeholder='Enter your new password'
                    label='Password'
                    value={values.password}
                    textStyle={styles.textStyle}
                    accessoryRight={passwordToggle}
                    secureTextEntry={secureTextEntry}
                    onChangeText={handleChange('password')}
                    size='large'
                />
                <Button onPress={handleSubmit} style={styles.button} >
                    Reset
                </Button>
                <Button onPress={handleCodeResend} style={styles.button} >
                    Resend code
                </Button>
            </View>
        )}
    </Formik>
    )
};

const styles = StyleSheet.create({
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