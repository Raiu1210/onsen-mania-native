import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screeens
import HomeScreen from './components/screens/HomeScreen';
import LoginScreen from './components/screens/LoginScreen';
import SignupScreen from './components/screens/SignupScreen';
import MyPageScreen from './components/screens/MyPageScreen'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'} screenOptions={{
        headerMode: 'screen',
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
        headerBackVisible: false
      }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{title: "温泉マニア", headerLeft: null, }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{title: "ログイン", headerLeft: null, }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{title: "ユーザ登録" }} />
        <Stack.Screen name="MyPage" component={MyPageScreen} options={{title: "マイページ", headerBackVisible: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}