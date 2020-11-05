import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { CategoryCard } from '../components/CategoryCard';
import http from '../helpers/Http';
import Token from '../helpers/Token';
import { showMessage, hideMessage } from "react-native-flash-message";
import { CategoriesCards } from '../components/Cards/CategoriesCards';
import AddressPickerButton from '../components/Buttons/AddressPickerButton';
import Map from '../components/Other/Map';
import { useNavigation } from '@react-navigation/native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';

function HomeScreen(props) {
  var [isLoggedIn, setLogin] = React.useState(false);
  const navigation = useNavigation();
  const [user, setUser] = React.useState({});
  const [destination, setDestination] = React.useState();
  const [location, setLocation] = useState(null);

  
  useEffect(() => {
    http.post('getUser').then((res) => {
      setUser(res.data);
    }); 
  }, []);


  var addressData;
  var initialRegion;
  var marker;

  if (props.deliveryAddress.deliveryAddress) {
    var addressData = props.deliveryAddress.deliveryAddress;
    var key = Object.keys(addressData)[0];
    var addressData = addressData[key];
    initialRegion = {
      latitude: addressData.lat,
      longitude: addressData.lng
    }

    marker = {
      latitude: addressData.lat,
      longitude: addressData.lng
    }
  }


  return (
    <View style={styles.container}>
        <Map initialRegion={initialRegion} marker={marker}  />
        <AddressPickerButton userId={user.id} address={addressData} />
        <CategoriesCards />
      </View> 
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
    deliveryAddress: state
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

