import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screeens
import HomeScreen from './components/screens/HomeScreen';
import LoginScreen from './components/screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStore.getItemAsync('jwtToken');
      if (token) {
        setIsLoggedIn(true);
      } 
        
      setIsLoading(false);
      
    };

    checkToken();
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen name="Home" component={HomeScreen} options={{title: "ホーム" }} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} options={{title: "ログイン" }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}