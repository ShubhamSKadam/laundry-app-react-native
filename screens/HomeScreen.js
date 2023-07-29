import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Caraousel from "../components/Caraousel";
import Services from "../components/Services";
import DressItem from "../components/DressItem";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);

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

    if (status !== "granted") {
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
    // console.log(coords);

    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      //   console.log(response);

      for (let item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode}`;
        setDisplayCurrentAddress(address);
      }
    }
  };

  const product = useSelector((state) => state.product.product);
  
  useEffect(()=>{
    if(product.length > 0){
      return;
    }

    const fetchProducts = () =>{
      services.map((service)=>{
        
      })
    }

  },[])

  // products data
  const services = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
      name: "shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
      name: "T-shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
      name: "dresses",
      quantity: 0,
      price: 10,
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
      name: "jeans",
      quantity: 0,
      price: 10,
    },
    {
      id: "14",
      image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
      name: "Sweater",
      quantity: 0,
      price: 10,
    },
    {
      id: "15",
      image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
      name: "shorts",
      quantity: 0,
      price: 10,
    },
    {
      id: "16",
      image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
      name: "Sleeveless",
      quantity: 0,
      price: 10,
    },
  ];

  return (
    <ScrollView style={{ backgroundColor: "#F0F0F0", flex: 1, marginTop: 50 }}>
      {/* Location and Profile */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Ionicons name="location" size={24} color="#fd5c63" />
        <View>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
          <Text>{displayCurrentAddress}</Text>
        </View>

        <Pressable style={{ marginLeft: "auto", marginRight: 7 }}>
          <Image
            style={{ width: 40, height: 40, borderRadius: 20 }}
            source={{
              uri: "https://pbs.twimg.com/profile_images/1519851219313135616/aGV94IOE_400x400.jpg",
            }}
          />
        </Pressable>
      </View>

      {/* Search Bar */}
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          margin: 10,
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: "0.8",
          borderColor: "#c0c0c0",
          borderRadius: 7,
        }}
      >
        <TextInput placeholder="Search for Items for More" />
        <Feather name="search" size={24} color="#fd5c63" />
      </View>

      {/* Image Carousel */}
      <Caraousel />

      {/* Services */}
      <Services />

      {/* Render all the products */}
      {services.map((item, index) => (
        <DressItem item={item} key={index} />
      ))}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
