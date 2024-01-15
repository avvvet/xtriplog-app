import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import tw from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { setTripInfo } from '../reducers/navSlice';

export default function Map() {
  const { origin, destination, addTripFlag } = useSelector((state) => state.nav);
  const mapViewRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (addTripFlag && mapViewRef.current && origin.lat && destination.lat) {
      mapViewRef.current.fitToSuppliedMarkers(["origin", "destination"], {
        edgePadding: { top: 30, right: 40, bottom: 20, left: 40 }
      });
    }
  }, [addTripFlag, origin, destination]);

  useEffect(() => {
    if (addTripFlag && mapViewRef.current && origin.lat && destination.lat) {
      const getTripTime = async () => {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.lat},${origin.lng}&destinations=${destination.lat},${destination.lng}&key=${GOOGLE_MAPS_APIKEY}`
          );
          const data = await response.json();
          const distanceInKilometers = data.rows[0].elements[0].distance.value / 1000;
          const durationText = data.rows[0].elements[0].duration.text;
          dispatch(setTripInfo({ distance: distanceInKilometers.toFixed(1), trip_time: durationText }));
        } catch (error) {
          // Handle error
          console.error("Error fetching trip time:", error);
        }
      };

      getTripTime();
    }
  }, [addTripFlag, origin, destination, GOOGLE_MAPS_APIKEY, dispatch]);

  return (
    <MapView
      ref={mapViewRef}
      provider={PROVIDER_GOOGLE}
      style={tw`flex-1`}
      initialRegion={{
        latitude: origin.lat || DEFAULT_LATITUDE,
        longitude: origin.lng || DEFAULT_LONGITUDE,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {addTripFlag && origin.lat && (
        <Marker
          coordinate={{
            latitude: origin.lat,
            longitude: origin.lng,
          }}
          title="From"
          description="yellow"
          identifier="origin"
          pinColor="green"
        />
      )}

      {addTripFlag && destination.lat && (
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

      {addTripFlag && mapViewRef.current && origin.lat && destination.lat && (
        <MapViewDirections
          origin={{ latitude: origin.lat, longitude: origin.lng }}
          destination={{
            latitude: destination.lat,
            longitude: destination.lng,
          }}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeColor="black"
          strokeWidth={4}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({});