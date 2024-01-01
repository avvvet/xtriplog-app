import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Switch} from 'react-native'
import React, { useState} from 'react'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import ToggleSwitch from 'toggle-switch-react-native'
import Footer from '../components/Footer';

const LogbookScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const navigation = useNavigation()

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`m-3 mt-7 p-3 bg-gray-50 rounded-sm`}>
        <TouchableOpacity onPress={() => navigation.navigate('ManualLog')}>
          <View style={tw`flex-row items-center mb-3 justify-between`}>
            <View style={tw`flex-row items-center`}>
              <Icon
                style={tw`p-1`}
                name="arrowright"
                color="black"
                type="antdesign"
              />
              <Text style={tw`text-lg text-black ml-2`}>Toggle Automatic Logbook</Text>
            </View>
            <Switch
              trackColor={{false: '#adb5bd', true: '#70e000'}}
              thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
              ios_backgroundColor="#adb5bd"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View style={tw`border-t-2 border-white mb-2`} />
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
          <View style={tw`border-t-2 border-white mb-2`} />
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
          <View style={tw`border-t-2 border-white mb-2`} />
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
          <View style={tw`border-t-2 border-gray-200 mb-2`} />
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
      <Footer/>
    </SafeAreaView>

  )
}

export default LogbookScreen

const styles = StyleSheet.create({})