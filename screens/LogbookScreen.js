import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';

const LogbookScreen = () => {

  const navigation = useNavigation()

  return (
    <View style={tw`p-7`}>
      <TouchableOpacity onPress={() => navigation.navigate('ManualLog')}>
        <View style={tw`flex-row items-center mb-3`}>
          <Icon
            style={tw`p-1`}
            name="arrowright"
            color="black"
            type="antdesign"
          />
          <Text style={tw`text-lg text-blue-500 ml-2`}>Toggle Automatic Logbook</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('ManualLog')}>
        <View style={tw`flex-row items-center mb-3`}>
          <Icon
            style={tw`p-1`}
            name="car"
            color="black"
            type="antdesign"
          />
          <Text style={tw`text-lg text-blue-500 ml-2`}>Create a Manual Logbook Entry</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ManualLog')}>
        <View style={tw`flex-row items-center mb-3`}>
          <Icon
            style={tw`p-1`}
            name="edit"
            color="black"
            type="antdesign"
          />
          <Text style={tw`text-lg text-blue-500 ml-2`}>View and Edit Logbook Entries</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ManualLog')}>
        <View style={tw`flex-row items-center mb-3`}>
          <Icon
            style={tw`p-1`}
            name="profile"
            color="black"
            type="antdesign"
          />
          <Text style={tw`text-lg text-blue-500 ml-2`}>Logbook Entry Report</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ManualLog')}>
        <View style={tw`flex-row items-center mb-3`}>
          <Icon
            style={tw`p-1 w-8`}
            name="setting"
            color="black"
            type="antdesign"
          />
          <Text style={tw`text-lg text-blue-500 ml-2`}>Logbook Settings</Text>
        </View>
      </TouchableOpacity>

    </View>
  )
}

export default LogbookScreen

const styles = StyleSheet.create({})