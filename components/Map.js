import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import tw from 'twrnc';
import { useSelector } from 'react-redux';

export default function Map() {
  const { origin, destination } = useSelector((state) => state.nav);
  const mapViewRef = useRef(null);

  useEffect(() => {
    if (mapViewRef.current && origin.lat && destination.lat) {
      // Calculate bounding box for both markers
      const minLat = Math.min(origin.lat, destination.lat);
      const maxLat = Math.max(origin.lat, destination.lat);
      const minLng = Math.min(origin.lng, destination.lng);
      const maxLng = Math.max(origin.lng, destination.lng);

      // Calculate center and delta for the bounding box
      const centerLat = (minLat + maxLat) / 2;
      const centerLng = (minLng + maxLng) / 2;
      const deltaLat = maxLat - minLat + 0.020; // Add padding
      const deltaLng = maxLng - minLng + 0.020; // Add padding

      mapViewRef.current.animateToRegion({
        latitude: centerLat,
        longitude: centerLng,
        latitudeDelta: deltaLat,
        longitudeDelta: deltaLng,
      });
    }
  }, [origin, destination]);

  return (
    <MapView
      ref={mapViewRef}
      provider={PROVIDER_GOOGLE}
      style={tw`flex-1`}
      initialRegion={{
        latitude: origin.lat || destination.lat,
        longitude: origin.lng || destination.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin.lat && (
        <Marker
          coordinate={{
            latitude: origin.lat,
            longitude: origin.lng,
          }}
          title="From"
          description="yellow"
          identifier="from"
          pinColor="green"
        />
      )}

      {destination.lat && (
        <Marker
          coordinate={{
            latitude: destination.lat,
            longitude: destination.lng,
          }}
          title="Destination"
          description="This is the destination"
          identifier="destination"
          pinColor="red"
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({});
