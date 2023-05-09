import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// screens
import CheckInScreen from './CheckInScreen';
import SearchScreen from './SearchScreen';
import RecordScreen from './RecordScreen';

const Tab = createBottomTabNavigator();


const HomeScreen = () => {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    getAccessToken();
  }, []);

  const getAccessToken = async () => {
    const token = await SecureStore.getItemAsync('access_token');
    setAccessToken(token || '');
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'CheckIn') {
            iconName = 'checkmark-circle';
          } else if (route.name === 'Search') {
            return <MaterialCommunityIcons name="map-search" size={size} color={color} />;
          } else if (route.name === 'Record') {
            return <MaterialCommunityIcons name="chart-bar" size={size} color={color} />;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Record" component={RecordScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="CheckIn" component={CheckInScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HomeScreen;