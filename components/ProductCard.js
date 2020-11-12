import * as React from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RectButton} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export function ProductCard(props) {
    const navigation = useNavigation();
    const item = props.item;

    const onPress = () => {
        navigation.navigate(props.routeName, { item: item });
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
                <View style={styles.imgContainer}>
                    <View style={{ backgroundColor: '#fff', borderRadius: 5, alignItems: 'center' }}>
                        <Image style={styles.img} source={{ url: 'http://localhost:8000/storage/' + item.image }} />
                    </View>
                </View>
                <View style={{ alignItems: 'flex-start', marginTop: 10, marginLeft: 2.5 }}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.price}>${item.price}</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexBasis: '30%',
        padding: 5,
        elevation: 5,
        marginRight: 10
    },
    imgContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    img: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        // alignItems: 'center'
        margin: 5,
    },
    title: {
        fontSize: 14,
        marginBottom: 5,
        fontFamily: 'sodo-sans-regular',
        color: '#22292F'
    },  
    price: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#00754a',
        marginLeft: 2.5
    }
});