import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Formik } from 'formik';
import { Input, Button, Text } from '@ui-kitten/components';

import { Alert as AlertIcon } from '@/icons';
import { PasswordToggle } from '@/components/PasswordToggle'

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
            {({ handleChange, handleBlur, handleSubmit, errors, values }) => (
                <View style={styles.container}>
                    <Input
                        style={styles.field} 
                        placeholder='(613) 327-8306'
                        label='Phone Number'
                        value={values.phone}
                        textStyle={styles.textStyle}
                        onChangeText={handleChange('phone')}
                        size='large'
                    />
                    {errors.phone &&
                        <Text style={{ fontSize: 12, color: 'red', alignSelf: 'flex-start', marginTop: 2}}>{errors.phone}</Text>
                    }
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
                    {errors.password &&
                        <Text style={{ fontSize: 12, color: 'red', alignSelf:'flex-start' }}>{errors.password}</Text>
                    }
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