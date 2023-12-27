import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { PROVIDER_GOOGLE }  from 'react-native-maps';
import tw from 'twrnc'

export default function Map() {
  return (
        <MapView
            provider={PROVIDER_GOOGLE}
            style={tw`flex-1`}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        />
  )
}

const styles = StyleSheet.create({})