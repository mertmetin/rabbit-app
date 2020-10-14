import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Platform, StyleSheet, Text, View, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { CategoryCard } from '../components/CategoryCard';
import http from '../helpers/Http';
import { showMessage, hideMessage } from "react-native-flash-message";
import { CategoriesCards } from '../components/Cards/CategoriesCards';
import { AddressPicker } from '../components/Other/AddressPicker';
import { useNavigation } from '@react-navigation/native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
// import Geolocation from '@react-native-community/geolocation';

export default function HomeScreen({ navigation, route }) {
  var origin = { latitude: 45.415355, longitude: -75.670803 };
  const destination = { latitude: 45.415355, longitude: -75.670803 };
  const GOOGLE_MAPS_APIKEY = '***REMOVED***';
  const { width, height } = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE = 45.415355;
  const LONGITUDE = -90.670803;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO / 4;
  var [isLoggedIn, setLogin] = React.useState(false);
  const [user, setUser] = React.useState({});


  React.useEffect(() => {
    http.post('http://localhost:8000/getAuthUser', {})
      .then(res => {
        if (res.data) {
          setLogin(true);
          setUser(res.data);
        }
      }).catch(error => {

      })
  }, []);


  var markerLat = 45.415355;
  var markerLng = -75.670803;
  var initialRegionLat = 45.415355;
  var initialRegionLng = -75.670803;

  var region = {
    latitude: initialRegionLat,
    longitude: initialRegionLng,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121
  }

  if (route.params && route.params.deliveryAddress)
  {
    const deliveryAddress = route.params.deliveryAddress;
    markerLat = parseFloat(deliveryAddress.lat);
    markerLng = parseFloat(deliveryAddress.lng);
    console.log(deliveryAddress.lat);
    initialRegionLat = markerLat;
    initialRegionLng = markerLng;
    region.latitude = markerLat;
    region.longitude = markerLng;
  }

  console.log(initialRegionLat);

  return (
    <View style={styles.container}>
      <AddressPicker label={"Choose Delivery Address"} userId={user.id}/>
        <MapView
          initialRegion={{
            latitude: initialRegionLat,
            longitude: initialRegionLng,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        region={region}
          style={{height: 250}}>
        <MapView.Marker
          coordinate={{
            latitude: markerLat,
            longitude: markerLng
          }}
        />
            {/* <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="rgb(0,139,241)" /> */}
          </MapView>
        <CategoriesCards />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column', 
    flexWrap: 'wrap',
    // padding: 20
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
