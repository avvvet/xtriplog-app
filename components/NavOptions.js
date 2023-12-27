import { FlatList, StyleSheet, Image, TouchableOpacity, View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { Icon } from '@rneui/themed';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const data = [
    { 
      id: "100",
      title: "Log book",
      image: "https://links.papareact.com/3pn",
      screen: "LogbookScreen"
    },
    { 
      id: "200",
      title: "Expense",
      image: "https://links.papareact.com/28w",
      screen: "ExpenseTrackerScreen"
    }
]
const NavOptions = () => {

  const navigation = useNavigation()
  
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      horizontal
      renderItem={({item}) => (
        <TouchableOpacity onPress={() => navigation.navigate('Logbook')} style={tw`p-2 pl-6 pb-4 pt-4 bg-gray-200 m-2 w-40`}>
          <View>
            <Image
              style={{width: 120, height: 120, resizeMode: 'contain'}}
              source={{uri: item.image}}
            />
            <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
            <Icon
              style={tw`p-2 bg-black rounded-full w-10 mt-4`}
              name="arrowright" color="white" type="antdesign"
            />
          </View>
        </TouchableOpacity>
      )}  
    />
  )
}

export default NavOptions

const styles = StyleSheet.create({})