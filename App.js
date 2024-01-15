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
  const [consecutiveSpeedCount, setConsecutiveSpeedCount] = useState(0);
  const [lastSpeedCheckTime, setLastSpeedCheckTime] = useState(0);
  
  const [errorMsg, setErrorMsg] = useState(null);
  const [isDriving, setIsDriving] = useState(false);
  const [locationEntries, setLocationEntries] = useState([]);

  const shouldStartDriving = (location) => {
    // Implement logic to determine if the user should start driving
    // For example, check for a significant change in location or speed.
    // Return true if driving should start, otherwise return false.

    //lets use speed condition
    const speedThreshold = 5; // meters per second (adjust as needed)
  
    console.log("line 28: speed ", location.coords.speed , "  speedThreshold ",  speedThreshold)
    return location.coords.speed > speedThreshold;
   
  };

  const shouldEndDriving = (location) => {
    // Implement logic to determine if the user should end driving
    // For example, check for a significant change in location or speed.
    // Return true if driving should end, otherwise return false.
    
    
    const speedThreshold = 5; // meters per second (adjust as needed)
    const consecutiveSpeedChecks = 5;
    const speedChecksInterval = 60000; // 1 minute in milliseconds

    // If the current speed is below the threshold, increment the consecutive counter
    if (location.coords.speed <= speedThreshold) {
      const currentTime = new Date().getTime();

      // Check if the time difference since the last speed check exceeds the interval
      if (currentTime - lastSpeedCheckTime >= speedChecksInterval) {
        setConsecutiveSpeedCount((prevCount) => prevCount + 1);

        // Check if the consecutive speed count is greater than or equal to the threshold
        if (consecutiveSpeedCount >= consecutiveSpeedChecks) {
          // Reset the consecutive counter and update the last speed check time
          setConsecutiveSpeedCount(0);
          setLastSpeedCheckTime(currentTime);
          return true;
        }
      }
    } else {
      // If the speed differs, reset the consecutive counter and update the last speed check time
      setConsecutiveSpeedCount(0);
      setLastSpeedCheckTime(new Date().getTime());
    }

    return false;
  };

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log(">>> Permission to access location was denied")
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
          
          // Analyze the location update to determine start/end of driving
          if (!isDriving && shouldStartDriving(location)) {
            startDriving();
          } else if (isDriving && shouldEndDriving(location)) {
            endDriving();
          }

          // If the user is driving, add the location to entries
          if (isDriving) {
            setLocationEntries((prevEntries) => [...prevEntries, location]);
          }
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

  const startDriving = () => {
    setIsDriving(true);
    setConsecutiveSpeedCount(0);
    // Additional logic when driving starts
  };

  const endDriving = () => {
    setIsDriving(false);
    // Additional logic when driving ends
  };

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

