import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

export default function ProfileScreen({navigation}) {
    var [isLoggedIn, setLogin] = React.useState(false);
    const [userId, setUserId] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');

    const guestView =
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={viewStyle.containerStyle}>
                <OptionButton
                    icon="md-person"
                    label="Login"
                    onPress={() => navigation.navigate('Login')}
                />
            </View>

            <View style={viewStyle.containerStyle}>
                <OptionButton
                    icon="md-navigate"
                    label="Addresses"
                    onPress={() => WebBrowser.openBrowserAsync('https://reactnavigation.org')}
                />

                <OptionButton
                    icon="md-heart"
                    label="Favorite Products"
                    onPress={() => WebBrowser.openBrowserAsync('https://forums.expo.io')}
                    isLastOption
                />
                <OptionButton
                    icon="md-help"
                    label="Support"
                    onPress={() => WebBrowser.openBrowserAsync('https://forums.expo.io')}
                    isLastOption
                />
            </View>

            <View style={viewStyle.containerStyle}>
                <OptionButton
                    icon="md-help"
                    label="Version"
                    onPress={() => WebBrowser.openBrowserAsync('https://reactnavigation.org')}
                />
            </View>
        </ScrollView>

        const userView = 
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View style={viewStyle.containerStyle}>
                    <OptionButton
                        icon="md-person"
                        label={name}
                    />
                    <OptionButton
                        icon="md-mail"
                        label={email}
                    />
                    <OptionButton
                        icon="md-phone-portrait"
                        label={phone}
                    />
                </View>
                <View style={viewStyle.containerStyle}>
                    <OptionButton
                        icon="md-card"
                        label={'Payment Methods'}
                        onPress={() => navigation.navigate('PaymentMethodsScreen', { userId: userId })}
                    />
                    <OptionButton
                        icon="md-lock"
                        label={'Change Password'}
                        onPress={() => navigation.navigate('ChangePasswordScreen', {userId: userId})}
                    />
                    <OptionButton
                        icon="md-person"
                        label={"Logout"}
                        onPress={() => {
                            axios.post('http://localhost:8000/logout', {
                          
                            })
                            .then(res => {
                                setLogin(false);
                                navigation.navigate('Home');
                            }).catch(error => {
                                
                            })
                        }}
                    />
                </View>
            </ScrollView>

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            axios.post('http://localhost:8000/getAuthUser', {
            })
            .then(res => {
                if (res.data)
                {
                    setUserId(res.data.id);
                    setLogin(true);
                    setPhone(res.data.phone);
                    setEmail(res.data.email);
                    setName(res.data.name);
                }
            }).catch(error => {

            })
        });

        return unsubscribe;
    }, [navigation]);

    const view = (isLoggedIn) ? userView : guestView;

    return (view);
}

function OptionButton({ icon, label, onPress, isLastOption }) {
    return (
        <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.optionIconContainer}>
                    <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
                </View>
                <View style={styles.optionTextContainer}>
                    <Text style={styles.optionText}>{label}</Text>
                </View>
            </View>
        </RectButton>
    );
}

const viewStyle = StyleSheet.create({
    containerStyle: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        marginTop: 25,
        marginBottom: 25
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    contentContainer: {
        paddingTop: 15,
    },
    optionIconContainer: {
        marginRight: 12,
    },
    option: {
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0,
        borderColor: '#ededed',
    },
    lastOption: {
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    optionText: {
        fontSize: 15,
        alignSelf: 'flex-start',
        marginTop: 1,
    },
});