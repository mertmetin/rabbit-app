import * as React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';

export function CategoryCard(props) {
    const navigation = useNavigation();
    const item = props.item;
    const storeId = props.storeId;
    const onPress = () => {
        navigation.navigate(props.routeName, {item: item, storeId: storeId});
    };

    return (    
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress} style={{ alignItems: 'center' }} activeOpacity={.7}>
                <View>
                    <Image style={styles.img} source={{ uri: item.image }} />
                </View>
                <Text style={styles.text}>{item.title}</Text>
            </TouchableOpacity>
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        width: '25%',
        paddingHorizontal: 4,
        paddingVertical: 8,
    },
    img: {
        width: 64,
        height: 64,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: theme.border,
        resizeMode: 'cover',
    },
    text: {
        fontSize: 12,
        lineHeight: 15,
        textAlign: 'center',
        marginTop: 6,
        color: theme.text,
        fontFamily: theme.font.semibold
    }
});
