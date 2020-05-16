import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export function IncreaseDecreaseInput(props) 
{
    const start = (props.start) ? props.start  : 0;
    const limit = (props.limit) ? props.limit : 50; 
    const [num, setNum] = React.useState(start);

    const decrease = () => {
        if (num == 0)
            return;
        
        setNum(num - 1);
        props.onDecrease();
    }

    const increase = () => {
        if (num == limit)
            return;

        setNum(num + 1);
        props.onIncrease();
    }

    return(
        <View style={[props.style, styles.container]}>
            <TouchableOpacity style={[styles.icon, styles.iconLeft]} onPress={decrease}>
                <Ionicons
                    name={'ios-remove'}
                    size={30}
                    // style={{ paddingRight: 15 }}
                />
            </TouchableOpacity>
            <Text style={styles.text}>{num}</Text>
            <TouchableOpacity style={[styles.icon, styles.iconRight]} onPress={increase}>
                <Ionicons
                    name={'ios-add'}
                    size={30}
                    // style={{ paddingLeft: 15 }}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    icon: {
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        padding: 10,
        flexBasis: '15%',
        alignItems: 'center'
    },
    iconLeft: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },  
    iconRight: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    text: {
        fontFamily: 'sodo-sans-semibold',
        fontSize: 24,
        backgroundColor: Colors.accentGreen,
        padding: 10,
        color: '#fff',
        flexBasis: '20%',
        textAlign: 'center'
    }
});

