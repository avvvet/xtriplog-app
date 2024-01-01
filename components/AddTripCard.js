import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import tw from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';
import { setOrigin, setDestination, setTripInfo, setAddTripFlag } from '../reducers/navSlice';
import Toast from 'react-native-toast-message';

// Default coordinates
const DEFAULT_LATITUDE = 37.78825;
const DEFAULT_LONGITUDE = -122.4324;

const DEFAULT_ORIGIN = {"lat": 8.9879715, "lng": 38.78918609999999}
const DEFAULT_DESTINATION = {"lat": 7.9879715, "lng": 48.78918609999999}

const AddTripCard = () => {
  const { origin, destination, tripInfo, addTripFlag } = useSelector((state) => state.nav);
  const dispatch = useDispatch();

  const originTextRef = useRef(null);
  const destinationTextRef = useRef(null);

  useEffect(() => {
    // Enable the "Add Trip" button only if both origin and destination are not default
    const areOriginDefault = (coord) => (
      coord.lat === DEFAULT_ORIGIN.lat && coord.lng === DEFAULT_ORIGIN.lng
    );

    const areDistinationDefault = (coord) => (
      coord.lat === DEFAULT_DESTINATION.lat && coord.lng === DEFAULT_DESTINATION.lng
    );
  
    if (!areOriginDefault(origin) && !areDistinationDefault(destination)) {
      dispatch(setAddTripFlag(true));
    } else {
      dispatch(setAddTripFlag(false));
    }
  }, [origin, destination, dispatch]);

  const handleAddTrip = () => {
    // Reset origin and destination to default coordinates
    dispatch(setOrigin({ lat: DEFAULT_ORIGIN.lat, lng: DEFAULT_ORIGIN.lng }));
    dispatch(setDestination({ lat: DEFAULT_DESTINATION.lat, lng: DEFAULT_DESTINATION.lng }));

    // Clear the text in the auto-complete components
    originTextRef.current?.setAddressText('');
    destinationTextRef.current?.setAddressText('');

    dispatch(setTripInfo({ distance: '', trip_time: '' }));
    dispatch(setAddTripFlag(false));

    Toast.show({
      type: 'success',
      text1: 'Log book entry added successfully',
      text2: 'Manual logbook entry has been added. 🤖️',
      text1Style: { fontSize: 16 },
      text2Style: { fontSize: 13 },
      position: 'top',
      visibilityTime: 4000,
    });
  }

  return (
    <View>
      <Text style={tw`text-center pt-3 text-5`}>add business trip</Text>
      <View style={tw`ml-5 mr-5 mt-3`}>
        <GooglePlacesAutocomplete
          ref={originTextRef}
          styles={{
            container: {
              flex: 0,
            },
          }}
          placeholder='From ?'
          fetchDetails={true}
          onPress={(data, details = null) => {
            dispatch(setOrigin(details.geometry.location));
          }}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'en',
          }}
          debounce={400}
          enablePoweredByContainer={false}
        />
      </View>

      <View style={tw`ml-5 mr-5 mt-3`}>
        <GooglePlacesAutocomplete
          ref={destinationTextRef}
          styles={{
            container: {
              flex: 0,
            },
          }}
          placeholder='To ?'
          fetchDetails={true}
          onPress={(data, details = null) => {
            dispatch(setDestination(details.geometry.location));
          }}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'en',
          }}
          enablePoweredByContainer={false}
          debounce={400}
        />
      </View>

      <View style={tw`flex-row pl-5 pr-5 pt-3 pb-3 mt-5 bg-white`}>
        <View style={tw`bg-blue-400 rounded-3xl mr-2 flex-1`}>
          <Text style={tw`py-1 text-4 text-white text-center`}>
            distance : {tripInfo.distance} km
          </Text>
        </View>

        <View style={tw`bg-green-400 rounded-3xl flex-1`}>
          <Text style={tw`py-1 text-4 text-white text-center`}>
            time : {tripInfo.trip_time}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleAddTrip}
        style={[tw`bg-black py-3 m-5`, { opacity: addTripFlag ? 1 : 0.5 }]}
        disabled={!addTripFlag}
      >
        <Text style={tw`text-center text-white text-xl`}>
          Add Trip
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default AddTripCard;