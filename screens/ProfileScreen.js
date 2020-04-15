import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

export default class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        // this.setState({isLoggedIn: false});
        this.state = { isLoggedIn: false };
    }

    componentDidMount() {
        var self = this;

        axios.post('http://localhost:8000/getAuthUser', {
        })
        .then(res => {
            if (res.data)
            {
                self.setState({
                    isLoggedIn: true,
                    email: res.data.email,
                    name: res.data.name,
                    phone: res.data.phone
                });
            }
        }).catch(error => {
            
        })
    }

    drawGuestView() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View style={viewStyle.containerStyle}>
                    <OptionButton
                        icon="md-person"
                        label="Login"
                        onPress={() => this.props.navigation.navigate('Login')}
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
        );
    }

    drawUserView() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View style={viewStyle.containerStyle}>
                    <OptionButton
                        icon="md-person"
                        label={this.state.name}
                    />
                    <OptionButton
                        icon="md-mail"
                        label={this.state.email}
                    />
                    <OptionButton
                        icon="md-phone-portrait"
                        label={this.state.phone}
                    />
                </View>
            </ScrollView>
        );
    }

    render() {
        const view = (this.state.isLoggedIn) ? 
            this.drawUserView() : this.drawGuestView();

        return (view);
    }
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