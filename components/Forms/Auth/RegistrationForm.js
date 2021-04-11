import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Formik } from 'formik';
import { Layout, Input, Button, Text } from '@ui-kitten/components';

import { PasswordToggle } from '../../Buttons/PasswordToggle'
import { InformationIcon } from '../../Icons/InformationIcon';

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
            {({ handleChange, handleBlur, handleSubmit, errors, values }) => (
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
                    {errors.name &&
                        <Text style={{ fontSize: 12, color: 'red', alignSelf: 'flex-start' }}>{errors.name}</Text>
                    }
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
                        <Text style={{ fontSize: 12, color: 'red', alignSelf: 'flex-start', marginTop: 2 }}>{errors.phone}</Text>
                    }
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
                    {errors.password &&
                        <Text style={{ fontSize: 12, color: 'red', alignSelf: 'flex-start' }}>{errors.password}</Text>
                    }
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
                    {errors.email &&
                        <Text style={{ fontSize: 12, color: 'red', alignSelf: 'flex-start' }}>{errors.email}</Text>
                    }
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