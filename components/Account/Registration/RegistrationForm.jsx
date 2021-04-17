import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Formik } from 'formik';
import { Layout, Input, Button, Text } from '@ui-kitten/components';

import { PasswordToggle } from '../../Buttons/PasswordToggle'
import { InformationIcon } from '../../Icons/InformationIcon';
import { ErrorMessage } from '../../ErrorMessage';
import { PhoneNumberInput } from '../../Input/PhoneNumberInput';


export const RegistrationForm = ({ validationSchema, submitHandler }) => {
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);
    const passwordToggle = <PasswordToggle secureTextEntry={secureTextEntry} 
        setSecureTextEntry={setSecureTextEntry} />

    const initialValues = {
        name: '',
        phone: '',
        password: '',
        email: ''
    };
        
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={values => submitHandler(values)}
            validateOnChange={false}
            validationSchema={validationSchema}
        >
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, errors, values }) => (
                <View style={styles.container}>
                    <Input
                        style={styles.field}
                        placeholder='John Appleseed'
                        label='Full name'
                        value={values.name}
                        textStyle={styles.textStyle}
                        onChangeText={handleChange('name')}
                        size='large'
                        autoCompleteType={'off'}
                    />
                    {errors.name && <ErrorMessage msg={errors.name} />}
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
                        captionIcon={InformationIcon}
                        secureTextEntry={secureTextEntry}
                        onChangeText={handleChange('password')}
                        size='large'
                    />
                    {errors.password && <ErrorMessage msg={errors.password} />}
                    <Input
                        style={styles.field}
                        placeholder='Enter your email'
                        label='Email'
                        value={values.email}
                        textStyle={styles.textStyle}
                        onChangeText={handleChange('email')}
                        size='large'
                        autoCapitalize='none'
                    />
                    {errors.email && <ErrorMessage msg={errors.email} />}
                    <Button onPress={handleSubmit} style={styles.button} >
                        Register
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