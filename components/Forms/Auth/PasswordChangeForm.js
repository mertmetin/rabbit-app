import React from 'react';
import { StyleSheet, TextInput, View, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import { Layout, Input, Button, Text } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';

export const PasswordChangeForm = props => {
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Ionicons size={24} {...props} name={secureTextEntry ? 'md-eye' : 'md-eye-off'} />
        </TouchableWithoutFeedback>
    );

    const AlertIcon = (props) => (
        <Ionicons size={11} {...props} name='md-information-circle-outline' />
    );

    return (
        <Formik
            initialValues={{ oldPassword: '', password: '' }}
            onSubmit={values => props.onPress(values)}
            validationSchema={props.validationSchema}
        >
            {({ handleChange, handleBlur, handleSubmit, errors, values }) => (
                <View style={styles.container}>
                    <Input
                        style={styles.field}
                        placeholder='Enter your password'
                        label='Password'
                        value={values.oldPassword}
                        textStyle={styles.textStyle}
                        // caption='Password should be at least 4 characters'
                        accessoryRight={renderIcon}
                        // captionIcon={AlertIcon}
                        secureTextEntry={secureTextEntry}
                        onChangeText={handleChange('oldPassword')}
                        size='large'
                    />
                    {errors.oldPassword &&
                        <Text style={{ fontSize: 12, color: 'red', alignSelf: 'flex-start' }}>{errors.oldPassword}</Text>
                    }
                    <Input
                        style={styles.field}
                        placeholder='Enter your new password'
                        label='New Password'
                        value={values.password}
                        textStyle={styles.textStyle}
                        caption='Password should be at least 4 characters'
                        accessoryRight={renderIcon}
                        captionIcon={AlertIcon}
                        secureTextEntry={secureTextEntry}
                        onChangeText={handleChange('password')}
                        size='large'
                    />
                    {errors.password &&
                        <Text style={{ fontSize: 12, color: 'red', alignSelf: 'flex-start' }}>{errors.password}</Text>
                    }
                    <Button onPress={handleSubmit} style={styles.button} >
                        Save
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