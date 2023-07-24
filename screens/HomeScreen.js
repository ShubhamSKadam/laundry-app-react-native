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

  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
