import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function OptionButton(props) {
    const navigation = useNavigation();
    const data = props.data;
    const onPress = () => {
        navigation.navigate(props.routeName, {data: data});
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                    <View>
                        <Text style={styles.text}>{props.title}</Text> 
                    </View>
                    <View>
                        <Ionicons
                            name={'ios-arrow-dropright-circle'}
                            size={24}
                            style={{ paddingRight: 15 }}
                        // color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({  
    container: {
        marginTop: 18,
        marginBottom: 18
    },
    text: {
        fontSize: 16,
        fontFamily: 'sodo-sans-regular'
    }
});