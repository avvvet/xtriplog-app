import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from "@env"
import tw from 'twrnc'
import { useDispatch, useSelector } from 'react-redux';
import { setOrigin, setDestination } from '../reducers/navSlice';


const ManualLogbookCard = () => {
  const { tripInfo } = useSelector((state) => state.nav);
  const dispatch = useDispatch();

  return (
    <View>
        <Text style={tw`text-center pt-3 text-5`}>add business trip</Text>
        <View style={tw`ml-5 mr-5 mt-3`}>
            <GooglePlacesAutocomplete
                styles={{
                    container: {
                        flex: 0,
                    },
                }}
                placeholder='From ?'
                fetchDetails={true}
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    dispatch(setOrigin(details.geometry.location));
                }}
                query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: 'en', // language of the results
                }}
                debounce={400} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                enablePoweredByContainer={false}
            />
        </View>

        <View style={tw`ml-5 mr-5 mt-3`}>
            <GooglePlacesAutocomplete
                styles={{
                    container: {
                        flex: 0,
                    },
                }}
                placeholder='To ?'
                fetchDetails={true}
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    dispatch(setDestination(details.geometry.location));
                }}
                query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: 'en', // language of the results
                }}
                enablePoweredByContainer={false}
                debounce={400} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
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

        <View>
            <TouchableOpacity style={tw`bg-black py-3 m-5`}>
                <Text style={tw`text-center text-white text-xl`}>
                    Add Trip
                </Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default ManualLogbookCard

const styles = StyleSheet.create({})