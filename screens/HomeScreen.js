import { StyleSheet, Text, View , SafeAreaView} from 'react-native'
import React from 'react'
import tw from 'twrnc'
import NavOptions from '../components/NavOptions'
import Footer from '../components/Footer'

const HomeScreen = () => {
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Text style={tw`text-7 pl-2 pb-2`}>XTripLog</Text>
        <NavOptions/>
      </View>
      <Footer/>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})