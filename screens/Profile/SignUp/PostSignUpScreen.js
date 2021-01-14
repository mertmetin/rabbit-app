import * as React from 'react';
import { Layout, Button } from '@ui-kitten/components';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { PostRegistrationContainer } from '../../../components/Containers/PostRegistrationContainer';

export default function PostSignUpScreen({ navigation, route }) {
    const data = route.params.data;
    const onPress = () => {
        navigation.navigate('SignUp');
    }

    return (
        <SafeAreaView>
            <Layout level='1' style={styles.container}>
                <View style={[styles.innerContainer, styles.box_shadow]}>
                    <PostRegistrationContainer data={data} />
                </View>
            </Layout>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#F1F1F1'
    },
    innerContainer: {
        padding: 20,
        backgroundColor: '#FFF',
    },
    box_shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
    }
});