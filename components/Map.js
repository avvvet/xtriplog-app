import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import tw from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_APIKEY} from "@env"
import { setTripInfo } from '../reducers/navSlice';

export default function Map() {
  const [error, setError] = useState(null)
  const { origin, destination } = useSelector((state) => state.nav);
  const mapViewRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (mapViewRef.current && origin.lat && destination.lat) {
    
      mapViewRef.current.fitToSuppliedMarkers(["origin", "destination"], {
        edgePadding: { top: 30, right: 40, bottom: 20, left: 40}
      })
    }
  }, [origin, destination]);
  
  useEffect(() => {
    if (mapViewRef.current && origin.lat && destination.lat) {
      const getTripTime = async () => {
        fetch(
          `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.lat},${origin.lng}&destinations=${destination.lat},${destination.lng}&key=${GOOGLE_MAPS_APIKEY}`
        )
          .then((res) => res.json())
          .then((data) => {
            const distanceInKilometers = data.rows[0].elements[0].distance.value / 1000;
            const durationText = data.rows[0].elements[0].duration.text;
            const durationInSeconds = data.rows[0].elements[0].duration.value;
            dispatch(setTripInfo({distance: distanceInKilometers.toFixed(1), trip_time: durationText}))
          })
          .catch((error) => {
            //console.error("Error fetching trip time:", error);
          });
      };
  
      getTripTime();
    }
  }, [origin, destination, GOOGLE_MAPS_APIKEY]);
  
  const onMapError = (error) => {
    setError(error)
  }

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
          identifier="origin"
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

      {!error && mapViewRef.current && origin.lat && destination.lat && (
        <MapViewDirections
          origin={{latitude: origin.lat, longitude: origin.lng}}
          destination={{
            latitude: destination.lat,
            longitude: destination.lng,
          }}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeColor="black"
          strokeWidth={4}
          // onReady={result => {
          //   // Convert duration to hours and minutes
          //   const hours = Math.floor(result.duration / 60);
          //   const minutes = Math.floor(result.duration % 60);
            

          //   // Format the duration
          //   const formattedDuration = `${hours}h ${minutes}min`;
          //   dispatch(setTripInfo({distance: result.distance.toFixed(1), trip_time: formattedDuration}))
          //   console.log(`Distance: ${result.distance} km`)
          //   console.log(`Duration: ${result.duration} min.`)
          // }}
          //onError={onMapError}
        />
      )}

    </MapView>
  );
}

const styles = StyleSheet.create({});
