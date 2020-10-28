import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';


export function OptionButton(props) {
    const navigation = useNavigation();
    const data = props.data;
    const onPress = () => {
        navigation.navigate(props.routeName, {data: data});
    };

    return (
        <RectButton style={styles.button} onPress={onPress}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15 }}>
                <View>
                    <Text style={styles.text}>{props.title}</Text>
                </View>
                <View>
                    <Ionicons
                        name={'ios-arrow-forward'}
                        size={24}
                        color={"#8b8c8d"}
                        // style={{ paddingRight: 15 }}
                    // color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
                    />
                </View>
            </View>
        </RectButton>
    );
}


const styles = StyleSheet.create({  
    container: {
        marginTop: 18,
        marginBottom: 18
    },
    button: {
        // padding: 10
    },
    text: {
        fontSize: 16,
        fontFamily: 'sodo-sans-regular'
    }
});