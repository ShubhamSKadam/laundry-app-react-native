import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";

const HomeScreen = () => {
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "Loading Your Location"
  );

  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Location Services Not Enabled",
        "Please Enable the Location Services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Okay",
            onPress: () => console.log("Okay Pressed"),
          },
        ],
        {
          cancelable: false,
        }
      );
    } else {
      setLocationServicesEnabled(enabled);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        "Permission Denied",
        "Allow the app to use the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Okay",
            onPress: () => console.log("Okay Pressed"),
          },
        ],
        {
          cancelable: false,
        }
      );
    }

    const { coords } = await Location.getCurrentPositionAsync();
    console.log(coords);

    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      console.log(response);

      for (let item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode}`;
        setDisplayCurrentAddress(address);
      }
    }
  };

  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
