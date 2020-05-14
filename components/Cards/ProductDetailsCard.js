import * as React from 'react';
import { Image, ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActionButton } from '../ActionButton';
import { IncreaseDecreaseInput } from '../IncreaseDecreaseInput';
import {connect} from 'react-redux';

export function ProductDetailsCard(props) {
    const item = props.item;
    const image = { uri: 'http://localhost:8000/storage/' + item.image };
    const [addBtnClicked, setBtnClickedState] = React.useState(false);

    const onPress = () => {
        setBtnClickedState(true);
        props.addItemToCart(item);
    }

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.imgContainer}>
                    <Image source={image} style={styles.img} />
                </View>
                <View style={styles.contentContainer}>
                    <View>
                        <Text style={styles.textTitle}>{item.title}</Text>
                        <Text style={styles.textDescription}>{item.description}</Text>
                    </View>
                    <View>
                        <Text style={styles.textPrice}>${item.price}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.footer}>
                <View style={{ alignItems: 'center', marginBottom: 10 }}>
                    <IncreaseDecreaseInput style={[(!addBtnClicked) ? { display: 'none' } : { display: 'flex' }]} start={1} />
                </View>
                <ActionButton style={[(addBtnClicked) ? { display: 'none' } : { display: 'flex' }, styles.btnAddToCart]} title={"Add to Cart"} onPress={onPress} />
            </View>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        cartItems: state 
    }
}

// export default connect()(ProductCard)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF'
    },
    imgContainer: {
        padding: 20,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    img: {
        alignSelf: 'center',
        resizeMode: 'cover',
        width: 250,
        height: 250
    },
    contentContainer: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between',
        paddingBottom: 20
    },
    textTitle: {
        color: '#1E3932',
        fontFamily: 'sodo-sans-bold',
        fontSize: 18
    },
    textDescription: {
        paddingTop: 10,
        color: '#585858',
        fontFamily: 'sodo-sans-regular'
    },
    textPrice: {
        color: '#1E3932',
        fontFamily: 'sodo-sans-bold',
        fontSize: 16
    },
    btnAddToCart: {
        paddingBottom: 20,
        alignSelf: 'center',
        width: '100%',
        textAlign: 'center'
    },
    footer: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.40,
        shadowRadius: 2,
        elevation: 15,
        width: '100%'
    }
});
