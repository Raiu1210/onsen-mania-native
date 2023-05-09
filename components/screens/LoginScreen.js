import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://monaledge.com:8888/users/login', {
        email,
        password,
      });

      // ログイン成功の処理を行う
      const token = response.data.access_token;
      await SecureStore.setItemAsync('access_token', token);
      navigation.navigate('Home');
    } catch (error) {
      // ログイン失敗の処理を行う
      console.log(error);
      Alert.alert('ログインエラー', 'ログインに失敗しました。');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Emailを入力してください"
          placeholderTextColor="#aaa"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="パスワードを入力してください"
          placeholderTextColor="#aaa"
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>ログイン</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
      backgroundColor: '#f5f5f5',
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      paddingVertical: 8,
      paddingHorizontal: 12,
      fontSize: 16,
      color: '#333',
    },
    loginButton: {
      backgroundColor: '#007bff',
      paddingVertical: 12,
      borderRadius: 4,
      alignItems: 'center',
      marginTop: 60,
    },
    loginButtonText: {
      fontSize: 16,
      color: '#fff',
      fontWeight: 'bold',
    },
  });
  
export default LoginScreen;