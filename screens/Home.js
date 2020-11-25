import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, Callout } from "react-native-maps";
import { Dimensions } from "react-native";
import * as Location from "expo-location";
import Constants from "expo-constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppLoading } from "expo";
import { fetchData, saveLocation } from "../actions";

const oldStreet = {
  latitude: 37.786,
  longitude: -122.3999,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

let currentLocation = {
  latitude: 37.786,
  longitude: -122.3999,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const Loading = () => (
  <View>
    <Text>Loading...</Text>
  </View>
);

const Home = () => {
  const dispatch = useDispatch();
  // const [location, setLocation] = useState(null);
  const location = useSelector((reduxState) => {
    // console.log(reduxState.loading, reduxState.location);
    return reduxState.location;
  });
  const coffeeShops = useSelector((reduxState) => reduxState.coffeeShops);

  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    dispatch(fetchData());
  }, [location]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      // setLocation(location);
      dispatch(saveLocation(location));
    })();
  }, []);

  if (!location) {
    return <Loading />;
  }

  currentLocation = {
    ...currentLocation,
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };

  return (
    <View>
      <MapView
        initialRegion={currentLocation}
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
        }}
      >
        {coffeeShops.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinates}
            title={marker.name}
            // icon={require("../assets/pin.svg")}
          >
            <Callout style={{ flex: 1 }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>{marker.name}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default Home;
