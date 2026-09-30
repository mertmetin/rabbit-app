import * as React from 'react';
import { useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import Token from '../../../helpers/Token';
import { Layout } from '@ui-kitten/components';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { GuestMenuList } from '../../../components/Lists/GuestMenuList';
import { AccountMenuList } from '../../../components/Lists/AccountMenuList';
import { theme } from '../../../theme';

function AccountScreen(props) {
    const [user, setUser] = React.useState({});
    const [isLoggedIn, setLogin] = React.useState(false);
    const navigation = useNavigation();

    useFocusEffect(React.useCallback(() => {
        Token.getToken().then((_token) => {
                if (!_token) {
                    setLogin(false);
                    return;
                }

                var decoded = jwtDecode(_token);

                if (Date.now() >= decoded.exp * 1000)
                    return false;

                setUser(decoded);
                setLogin(true);
            });
    }, []));

    const logOut = () => {
        Token.removeToken();
        setLogin(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Layout level='1' style={styles.container}>
                {(isLoggedIn) ?
                    <AccountMenuList user={user} logOut={logOut} />
                    : <GuestMenuList />}
            </Layout>
        </SafeAreaView>
    )
}
export default AccountScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background
    },
    innerContainer: {
        flex: 1
    }
});