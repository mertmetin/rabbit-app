import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Picker } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { showMessage, hideMessage } from "react-native-flash-message";
import { OptionButton } from '../../../components/OptionButton';
import { ActionButton } from '../../../components/ActionButton';
import { useNavigation } from '@react-navigation/native';
import Token from '../../../helpers/Token';
import http from '../../../helpers/Http';
import jwt_decode from "jwt-decode";

function AccountScreen(props) {
    const [user, setUser] = React.useState({});
    const [isLoggedIn, setLogin] = React.useState(false);
    const navigation = useNavigation();

    useEffect(() => {
            Token.getToken().then((_token) => {
                if (!_token)
                    return;

                var decoded = jwt_decode(_token);
                setUser(decoded);
                setLogin(true);
            });
    }, []);

    const logOut = () => {
        Token.removeToken();
        setLogin(false);
    };

    const guestView = (
        <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                <ActionButton title={'Join now'} onPress={() => navigation.push('SignUp')} />
                <ActionButton buttonStyle={'outlined'} title={'Sign in'} onPress={() => navigation.push('SignIn')} />
            </View>
        </View>
    );

    const userView = (  
        <View>
            <View style={{ padding: 15 }}>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.email}>{user.email}</Text>
            </View>
            <View >
                <Text style={styles.sectionContainer}>Profile</Text>
                <OptionButton title={'Personal info'} routeName={'InfoScreen'} data={user} />
                <OptionButton title={'Addresses'} routeName={'AddressScreen'} data={user.id} />
                <OptionButton title={'Payment Methods'} routeName={'CardsScreen'} data={user.id} />
            </View>
            <View>
                <Text style={styles.sectionContainer}>Security</Text>
                <OptionButton title={'Change password'} routeName={'ChangePasswordScreen'} data={user.id} />
            </View>
            <View style={{padding: 20}}>
                <ActionButton style={'outlined'} title={'Log out'} onPress={logOut} />
            </View>
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
        margin: 10
        // paddingTop: 20,
        // paddingLeft: 15
    },  
    sectionContainer: {
        marginTop: 30,
        padding: 15, 
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

export default AccountScreen;