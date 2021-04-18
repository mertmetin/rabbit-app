import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Formik } from 'formik';
import { Input, Button } from '@ui-kitten/components';

import { Alert as AlertIcon } from '@/icons';

import { PasswordToggle } from '@/components/PasswordToggle'
import { ErrorMessage } from '@/components/ErrorMessage';
import { PhoneNumberInput } from '@/components/Input/PhoneNumberInput';

export const LoginForm = ( { validationSchema, submitHandler } ) => {
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);
    const passwordToggle = <PasswordToggle secureTextEntry={secureTextEntry} 
        setSecureTextEntry={setSecureTextEntry} />

    const initialValues = {
        phone: '',
        password: ''
    }
    
    return(
        <Formik
            initialValues={initialValues}
            onSubmit={values => submitHandler(values)}
            validateOnChange={false}
            validationSchema={validationSchema}
        >
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, errors, values }) => (
                <View style={styles.container}>
                    <PhoneNumberInput 
                        value={values.phone} 
                        setFieldValue={setFieldValue} 
                    />
                    {errors.phone && <ErrorMessage msg={errors.phone} />}
                    <Input
                        style={styles.field} 
                        placeholder='Enter your password'
                        label='Password'
                        value={values.password}
                        textStyle={styles.textStyle}
                        caption='Password should be at least 4 characters'
                        accessoryRight={() => passwordToggle}
                        captionIcon={AlertIcon}
                        secureTextEntry={secureTextEntry}
                        onChangeText={handleChange('password')}
                        size='large'
                    />
                    {errors.password && <ErrorMessage msg={errors.password} />}           
                    <Button onPress={handleSubmit} style={styles.button} >
                        Login
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