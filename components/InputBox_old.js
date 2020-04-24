import * as React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, TextInput, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../constants/Colors';

export function InputBox(props) {
    const [text, setText] = React.useState('Useless Placeholder');
    const [isFieldActive, setFieldState] = React.useState(false);
    const defaultProps = {
        keyboardType: 'default',
        titleActiveSize: 15,
        titleInActiveSize: 16,
        titleActiveColor: 'black',
        titleInactiveColor: 'dimgrey',
        textInputStyles: {},
        otherTextInputAttributes: {},
    }

    const labelStyle = {
        position: 'absolute',
        left: 0,
        top: !isFieldActive ? 18 : 0,
        fontSize: !isFieldActive ? 20 : 14,
        color: !isFieldActive ? '#aaa' : '#000',
    }

    const _animatedIsFocused = new Animated.Value(0);

    React.useEffect(() => {
        Animated.timing(_animatedIsFocused, {
            toValue: isFieldActive ? 1 : 0,
            duration: 200,
        }).start();
    });




    var position = new Animated.Value(text ? 1 : 0);


    const _handleFocus = () => {
        setFieldState(true);

        // if (!isFieldActive) {
        //     setFieldState(true);
        //     Animated.timing(position, {
        //         toValue: 1,
        //         duration: 150,
        //     }).start();
        // }
    }

    const _handleBlur = () => {
        setFieldState(false);

        // if (isFieldActive && !text) {
        //     setFieldState(false);
        //     Animated.timing(position, {
        //         toValue: 0,
        //         duration: 150,
        //     }).start();
        // }
    }

    const _returnAnimatedTitleStyles = () => {
        console.log(isFieldActive);

        return {
            top: position.interpolate({
                inputRange: [0, 1],
                outputRange: [14, 0],
            }),
            fontSize: isFieldActive ? defaultProps.titleActiveSize : defaultProps.titleInActiveSize,
            color: isFieldActive ? defaultProps.titleActiveColor : defaultProps.titleInactiveColor,
        }
    }

    return (
        <View style={styles.container}>
            {/* <Text style={styles.labelStyle}>Email</Text> */}
            <Animated.Text
                style={styles.labelStyle}
            >
                Hello
            </Animated.Text>
            <TextInput
                style={styles.input}
                onChangeText={text => setText(text)}
                onPress={_handleFocus}
                onFocus={_handleFocus}
                onBlur={_handleBlur}

            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 3,
        // borderStyle: 'solid',
        borderBottomWidth: 0.5,
        // height: 40,
        marginVertical: 4,
    },
    label: {
        // fontSize: 16
        // color: 'rgba(0, 0, 0, .56)',
        // paddingLeft: 6  
    },
    input: {
        height: 26,
        fontSize: 20,
        marginTop: 5,

        // marginTop: 18,
        // marginBottom: 18,
        // borderBottomWidth: 0.5,
        color: 'rgba(0, 0, 0, .56)',
        // marginTop: -10,
        // paddingLeft: 6

        // paddingTop: 32,
        // paddingBottom: 6
    },
    // titleStyles: {
    //     position: 'absolute',
    //     fontFamily: 'sodo-sans-regular',
    //     left: 3,
    //     left: 4,
    // }
});