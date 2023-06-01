import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const SignupScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignup = async () => {
    try {
      const response = await axios.post('https://monaledge.com:8888/users/register', {
        username,
        email,
        password,
      });

      if(response.data.status == 0) {
        Alert.alert('ユーザ登録完了', 'サインアップが成功しました');
        navigation.navigate('Login');
      } else {
        Alert.alert('エラー', `サインアップに失敗しました。${response.data.message}`);
      }
    } catch (error) {
      console.error(error);
      // エラーメッセージを表示するなど、エラーハンドリングを行います
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ユーザネーム</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button style={styles.signupButton} title="登録" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
    marginBottom: 200,
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
    marginBottom: 24
  },
});

export default SignupScreen;