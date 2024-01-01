import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

const Footer = () => {
  return (
    <View style={tw`absolute bottom-0 flex-row items-center w-full p-4`}>
      <Text style={tw`text-sm text-center w-full`}>v1.0 © 2024 xtriplog</Text>
    </View>
  );
};

export default Footer;
