import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import Map from '../components/Map';
import ManualLogbookCard from '../components/ManualLogbookCard';

export default function ManualLog() {

  return (
    <View style={tw`h-full`}>
        <View style={tw`h-50`}>
            <Map/>
        </View>

        <View style={tw`h-50`}>
            <ManualLogbookCard/>
        </View>

    </View>     
  )
}

const styles = StyleSheet.create({})