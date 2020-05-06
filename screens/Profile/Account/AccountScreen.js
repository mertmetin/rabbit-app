import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Picker } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { showMessage, hideMessage } from "react-native-flash-message";
import { OptionButton } from '../../../components/OptionButton';
import { ActionButton } from '../../../components/ActionButton';
import { useNavigation } from '@react-navigation/native';
import { isRearCameraAvailable } from 'expo/build/AR';

export default function AccountScreen(props) {
    const [user, setUser] = React.useState({});
    const navigation = useNavigation();
    var [isLoggedIn, setLogin] = React.useState(false);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            axios.post('http://localhost:8000/getAuthUser', {
            })
                .then(res => {
                    if (res.data) {
                        setLogin(true);
                        setUser(res.data);
                    }
                }).catch(error => {
                })
        });

        return unsubscribe;
    }, [navigation]);

    const guestView = (
        <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                <ActionButton title={'Join now'} onPress={() => navigation.navigate('SignUp')} />
                <ActionButton style={'outlined'} title={'Sign in'} onPress={() => navigation.navigate('SignIn')} />
            </View>
        </View>
    );

    const logOut = () => {
        axios.post('http://localhost:8000/logout', {})
        .then(res => {
            setLogin(false);
            navigation.navigate('AccountScreen');
        })
        .catch(error => {})
    };

    const userView = (
        <View style={styles.container}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <View>
                <Text style={styles.sectionContainer}>Profile</Text>
                <OptionButton title={'Personal info'} routeName={'InfoScreen'} data={user} />
                <OptionButton title={'Addresses'} routeName={'AddressScreen'} data={user.id} />
                <OptionButton title={'Payment Methods'} routeName={'CardsScreen'} data={user.id} />
            </View>
            <View>
                <Text style={styles.sectionContainer}>Security</Text>
                <OptionButton title={'Change password'} routeName={'ChangePasswordScreen'} data={user.id} />
            </View>
            <ActionButton style={'outlined'} title={'Log out'} onPress={logOut} />
        </View>
    );

    const view = (isLoggedIn) ? userView : guestView;
        
    return (
        <ScrollView style={{
            backgroundColor: '#f6f7f8'}}>
                {view}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingLeft: 15
    },  
    sectionContainer: {
        marginTop: 50, 
        fontSize: 18, 
        fontFamily: 'sodo-sans-semibold'
    },
    name: {
       fontSize: 24,
       fontFamily: 'sodo-sans-bold'
    },
    email: {
        fontSize: 12,
        fontFamily: 'sodo-sans-regular',
        marginTop: 5
    }
});