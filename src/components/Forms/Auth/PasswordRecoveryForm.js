import React from 'react';
import { StyleSheet, TextInput, View, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import { Layout, Input, Button, Text } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';

export const PasswordRecoveryForm = props => {
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Ionicons size={24} {...props} name={secureTextEntry ? 'md-eye' : 'md-eye-off'} />
        </TouchableWithoutFeedback>
    );

    return (
        <Formik
            initialValues={{ token: '', password: '' }}
            onSubmit={values => props.onPress(values)}
            validationSchema={props.validationSchema}
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
                {errors.token &&
                    <Text style={{ fontSize: 12, color: 'red', alignSelf: 'flex-start', marginTop: 2 }}>{errors.token}</Text>
                }
                <Input
                    style={styles.field}
                    placeholder='Enter your new password'
                    label='Password'
                    value={values.password}
                    textStyle={styles.textStyle}
                    accessoryRight={renderIcon}
                    secureTextEntry={secureTextEntry}
                    onChangeText={handleChange('password')}
                    size='large'
                />
                <Button onPress={handleSubmit} style={styles.button} >
                    Reset
                </Button>
                <Button onPress={props.resendCode} style={styles.button} >
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