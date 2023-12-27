import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native';

const LogbookScreen = () => {

  const navigation = useNavigation()

  return (
    <View style={tw`p-7`}>
      <TouchableOpacity onPress={() => navigation.navigate('ManualLog')}>
       <Text style={tw`text-lg text-blue-500`}>Add manual trip log</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LogbookScreen

const styles = StyleSheet.create({})