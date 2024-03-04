import { View, Text } from "react-native";
import React from "react";
import { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet } from "react-native";
import { defaultStyles } from "./constants/Styles";
import { Marker } from "react-native-maps";
import { ListingGeo } from "./interfaces/listingGeo";
import { useRouter } from "expo-router";
import MapView from "react-native-map-clustering";

interface Props {
  listings: any;
}

const INITIAL_REGION = {
  latitude: 34.0259,
  longitude: -118.7798,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const ListingsMap = ({ listings }: Props) => {
  const router = useRouter();

  const onMarkerSelected = (item: ListingGeo) => {
    router.push(`/listing/${item.properties.id}`);
  };

  return (
    <View style={defaultStyles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton
        initialRegion={INITIAL_REGION}>
        {listings.features.map((item: ListingGeo) => (
          <Marker
            key={item.properties.id}
            onPress={() => onMarkerSelected(item)}
            coordinate={{
              latitude: +item.properties.latitude,
              longitude: +item.properties.longitude,
            }}>
            <View
              style={
                item.properties.price !== null
                  ? styles.marker
                  : styles.markerNull
              }>
              {item.properties.price !== null && (
                <Text style={styles.markerText}>{item.properties.price} €</Text>
              )}
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marker: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
    borderRadius: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  markerNull: {
    backgroundColor: "transparent",
  },
  markerText: {
    fontFamily: "mon-sb",
    fontSize: 14,
  },
});

export default ListingsMap;
