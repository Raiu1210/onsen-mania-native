import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const RecordScreen = () => {
  const [onsenData, setOnsenData] = useState([]);
  const [myVisitData, setMyVisitData] = useState([]);

  useEffect(() => {
    const fetchMyVisitData = async () => {
      try {
        const accessToken = await SecureStore.getItemAsync('access_token');
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const response = await axios.get('https://monaledge.com:8888/users/my_visit', {
          headers: headers,
        });
        const data = response.data;
        setMyVisitData(data);
      } catch (error) {
        console.log('Error fetching My Visit data:', error);
      }
    };

    const fetchOnsenData = async () => {
      try {
        const response = await axios.get('https://monaledge.com:8888/onsen/onsen_list');
        const data = response.data;
        setOnsenData(data);
      } catch (error) {
        console.log('Error fetching onsen data:', error);
      }
    };

    fetchMyVisitData();
    fetchOnsenData();
  }, []);
    
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Record Screen</Text>
      {myVisitData.map((visit, index) => (
        <View key={index}>
          <Text>Name: {visit.name}</Text>
          <Text>Address: {visit.address}</Text>
          {/* 他のデータを表示するために適宜追加 */}
        </View>
      ))}
    </View>
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

export default RecordScreen;