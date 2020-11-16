import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { CategoryCard } from '../components/CategoryCard';
import http from '../helpers/Http';
import Token from '../helpers/Token';
import { showMessage, hideMessage } from "react-native-flash-message";
import { CategoriesCards } from '../components/Cards/CategoriesCards';
import Map from '../components/Other/Map';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import DeliveryMap from '../components/Other/DeliveryMap';
import AddressPickerButton from '../components/Buttons/AddressPickerButton';


function HomeScreen(props) {
  // var [isLoggedIn, setLogin] = React.useState(false);
  // const navigation = useNavigation();
  const [user, setUser] = React.useState({});
  const [store, setStore] = React.useState();

  const deliveryAddress = props.state.deliveryAddress;

  var key = Object.keys(deliveryAddress)[0];
  var address = deliveryAddress[key];

  useEffect(() => {
    http.post('getStore', { address: address }).then((response) => {
      if (response.data) {
        var data = response.data;

        setStore(data);
      } else {
        setStore(false);
      }
    });

    const getUser = () => {
      http.post('getUser').then((res) => {

        setUser(res.data);
      }, {}).catch((error) => {
        console.log(error);
      })
    }


    Token.getToken().then((_token) => {
      if (!_token)
        return;

      getUser();
    });

  }, [address.id]);

  return (
    <SafeAreaView style={styles.container}>
      {store ? <Map marker={{ latitude: parseFloat(address.lat), 
          longitude: parseFloat(address.lng)}} destination={store} /> : <Text>asd</Text>}
      <AddressPickerButton userId={user.id} address={address} />
      {store && <CategoriesCards storeId={store.id} /> }
    </SafeAreaView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column', 
    flexWrap: 'wrap',
  }
});

const mapStateToProps = (state) => {
  return {
    state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDeliveryAddress: (address) => dispatch({
      type: 'SET_DELIVERY_ADDRESS',
      payload: address
    }),
    removeDeliveryAddress: (address) => dispatch({
      type: 'REMOVE_DELIVERY_ADDRESS',
      payload: address
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

