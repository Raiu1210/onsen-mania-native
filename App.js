import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screeens
import HomeScreen from './components/screens/HomeScreen';
import LoginScreen from './components/screens/LoginScreen';
import SignupScreen from './components/screens/SignupScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('');

  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStore.getItemAsync('access_token');
      setIsLoading(false);

      if (token) {
        setInitialRoute('Home');
      } else {
        setInitialRoute('Login');
      }
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
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{
        headerMode: 'screen',
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
        headerBackVisible: false
      }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{title: "温泉マニア", headerLeft: null, }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{title: "ログイン", headerLeft: null, }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{title: "ユーザ登録" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}