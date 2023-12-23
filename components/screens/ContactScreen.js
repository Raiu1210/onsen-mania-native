import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Keyboard, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const ContactScreen = () => {
  const [inputText, setInputText] = useState('');
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleSubmit = async () => {
    if(inputText == '') {
      Alert.alert('おっと！', '何も入力せずに送らないでくれよｗ');
      return ;
    }
    try {
      const token = await SecureStore.getItemAsync('access_token');
      const response = await axios.post('https://monaledge.com:8888/contacts/new_contact', 
        { content: inputText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      Alert.alert('連絡ありがとう！', response.data.message);
      setInputText('')
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          onChangeText={text => setInputText(text)}
          value={inputText}
          placeholder="未追加の温泉を見つけたとかあったら教えてね"
          multiline
          numberOfLines={4}
        />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: '80%',
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ContactScreen;