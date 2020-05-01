import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { CategoryCard } from '../components/CategoryCard';
import { showMessage, hideMessage } from "react-native-flash-message";
import { ActionButton } from '../components/ActionButton';

export default function ProductDetailsScreen({ navigation, route }) {
    const item = route.params.item;
    const image = { uri: 'http://localhost:8000/storage/' + item.image};
    const [imgWidth, setImageWidth] = React.useState(0);
    const [imgHeight, setImageHeight] = React.useState(0);

    Image.getSize('http://localhost:8000/storage/' + item.image, (width, height) => {
        setImageWidth(width);
        setImageHeight(height);
    });

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF'}}>
            <View style={styles.imgContainer}>
                <Image source={image} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20, resizeMode: 'cover', width: imgWidth, height: imgHeight}} />
                <View style={{alignSelf: 'center', paddingBottom: 20}}>
                    <Text style={{ textAlign: 'center', color: '#fff', fontFamily: 'sodo-sans-bold', fontSize: 16}}>${item.price}</Text>
                    <Text style={{ marginTop: 3, color: '#fff', fontFamily: 'sodo-sans-bold', fontSize: 18 }}>{item.title}</Text>
                </View>
            </View>
            <View style={{flex: 1, padding:20}}>
                <Text style={{ color: '#585858', fontFamily: 'sodo-sans-regular'}}>{item.description}</Text>

                <View style={{marginTop: 20}}>
                    <Text style={{ fontSize: 16, fontFamily: 'lander-grande-semibold'}}>Nutrition Information</Text>
                    <Text style={{marginTop: 20, fontFamily: 'sodo-sans-regular'}}>Calories: 20</Text>
                </View>
                <View style={{position: 'absolute', 'right': 0, bottom: 0, right: 15}}>
                    <ActionButton title={"Add item"} />
                </View>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    imgContainer: {
        backgroundColor: '#1E3932'
    },
    image: {
        // flex: 5,
        // resizeMode: "cover",
        // justifyContent: "center",
        height: 282,
        width: '100%'
    },
    text: {
        // flex:1,
        color: "grey",
        fontSize: 30,
        fontWeight: "bold",
        // alignItems: "flex-end"
    }
});
