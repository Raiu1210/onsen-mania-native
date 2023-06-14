import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

// screens
import CheckInScreen from './CheckInScreen';
import SearchScreen from './SearchScreen';
import RecordScreen from './RecordScreen';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const navigation = useNavigation();

  const checkToken = async () => {
    try {
      const accessToken = await SecureStore.getItemAsync('access_token');
      if (accessToken == null) {
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log('データの取得に失敗しました:', error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

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


export default HomeScreen;