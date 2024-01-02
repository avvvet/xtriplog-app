import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogbookScreen from './screens/LogbookScreen';
import ManualLog from './screens/ManualLog';
import { Provider } from 'react-redux';
import { store } from './store'
import Toast from 'react-native-toast-message';
import * as Location from 'expo-location';

export default function App() {

  const Stack = createNativeStackNavigator();
  
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          timeInterval: 5000, // milliseconds
          distanceInterval: 1, // meters
          foregroundService: {
            notificationTitle: 'Background Location Tracking',
            notificationBody: 'Your app is tracking your location in the background.',
          },
        },
        (location) => {
          // Handle the received location update
          console.log('Location update:', location);
        }
      );

      return () => {
        // Unsubscribe when the component unmounts
        if (locationSubscription) {
          locationSubscription.remove();
        }
      };
    })();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding": "height"}
            style={{ flex: 1}}
          >
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Logbook" component={LogbookScreen} />
            <Stack.Screen name="ManualLog" component={ManualLog} />
          </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
        <Toast />
      </NavigationContainer>
    </Provider>
  );
}

