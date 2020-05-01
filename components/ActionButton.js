import * as React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../constants/Colors';

export function ActionButton(props) {
    const style = (props.style) ? props.style : 'regular';

    if (style == 'outlined')
    {
        var containerStyle = StyleSheet.compose(styles.container, stylesOutlined.container);
        var textStyle = StyleSheet.compose(styles.text, stylesOutlined.text);
    }
    else if (style == 'regular')
    {
        var containerStyle = StyleSheet.compose(styles.container, stylesRegular.container);
        var textStyle = StyleSheet.compose(styles.text, stylesRegular.text);
    }
            
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={containerStyle}>
                <Text style={textStyle}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderRadius: 50
    },
    text: {
        fontSize: 18,
        fontFamily: 'sodo-sans-semibold',
        paddingTop: 7.5,
        paddingBottom: 7.5,
        paddingLeft: 15,
        paddingRight: 15
    }
});

const stylesRegular = StyleSheet.create({
    container: {
        backgroundColor: '#4c9f87',
        borderTopColor: '#4c9f87',
        borderBottomColor: '#4c9f87',
        borderLeftColor: '#4c9f87',
        borderRightColor: '#4c9f87'
    },
    text: {
       color: '#fff'
    }
});


const stylesOutlined = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        borderTopColor: '#4c9f87',
        borderBottomColor: '#4c9f87',
        borderLeftColor: '#4c9f87',
        borderRightColor: '#4c9f87'
    },
    text: {
        color: '#4c9f87'
    }
});

// const styles = StyleSheet.create({
//     container: {
//         alignSelf: 'flex-start',
//         borderTopColor: Colors.accentGreen,
//         borderTopWidth: 1,
//         borderBottomColor: Colors.accentGreen,
//         borderBottomWidth: 1,
//         borderLeftColor: Colors.accentGreen,
//         borderLeftWidth: 1,
//         borderRightColor: Colors.accentGreen,
//         borderRightWidth: 1,
//         borderRadius: 50
//     },
//     text: {
//         fontSize: 18,
//         fontFamily: 'sodo-sans-semibold',
//         color: Colors.accentGreen,
//         paddingTop: 7.5,
//         paddingBottom: 7.5,
//         paddingLeft: 15,
//         paddingRight: 15
//     }
// });