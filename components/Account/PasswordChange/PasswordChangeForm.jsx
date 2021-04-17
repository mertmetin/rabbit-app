import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Formik } from 'formik';
import { Input, Button, Text } from '@ui-kitten/components';

import { PasswordToggle } from '../../Buttons/PasswordToggle';
import { InformationIcon } from '../../Icons/InformationIcon';
import { ErrorMessage } from '../../ErrorMessage';

export const PasswordChangeForm = ({ validationSchema, submitHandler }) => {
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);
    const [secureTextEntryConfirm, setSecureTextEntryConfirm] = React.useState(true);

    const passwordToggle = <PasswordToggle secureTextEntry={secureTextEntry} 
        setSecureTextEntry={setSecureTextEntry} />
    const passwordToggleConfirm = <PasswordToggle secureTextEntry={secureTextEntryConfirm} 
        setSecureTextEntry={setSecureTextEntryConfirm} />

    return (
        <Formik
            initialValues={{ oldPassword: '', password: '' }}
            onSubmit={values => submitHandler(values)}
            validateOnChange={false}
            validationSchema={validationSchema}
        >
            {({ handleChange, handleBlur, handleSubmit, errors, values }) => (
                <View style={styles.container}>
                    <Input
                        style={styles.field}
                        placeholder='Enter your password'
                        label='Password'
                        value={values.oldPassword}
                        textStyle={styles.textStyle}
                        accessoryRight={() => passwordToggle}
                        secureTextEntry={secureTextEntry}
                        onChangeText={handleChange('oldPassword')}
                        size='large'
                    />
                    <Input
                        style={styles.field}
                        placeholder='Enter your new password'
                        label='New Password'
                        value={values.password}
                        textStyle={styles.textStyle}
                        caption='Password should be at least 4 characters'
                        accessoryRight={() => passwordToggleConfirm}
                        captionIcon={InformationIcon}
                        secureTextEntry={secureTextEntryConfirm}
                        onChangeText={handleChange('password')}
                        size='large'
                    />
                    {errors.password && <ErrorMessage msg={errors.password} />}\
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