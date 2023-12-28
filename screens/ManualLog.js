import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from "@env"
import tw from 'twrnc'
import Map from '../components/Map';
import { useDispatch } from 'react-redux';
import { setOrigin, setDestination } from '../reducers/navSlice';

export default function ManualLog() {
    
 const dispatch = useDispatch();

  return (
    <View style={tw`h-full`}>
        <View style={tw`h-50`}>
            <Map/>
        </View>

        <View style={tw`h-50`}>

            <View style={tw`ml-5 mr-5 mt-5`}>
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

            <View style={tw`ml-5 mr-5 mt-5`}>
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

        </View>

    </View>     
  )
}

const styles = StyleSheet.create({})