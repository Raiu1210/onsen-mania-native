import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// components
import OnsenCardComponent from '../OnsenCardComponent';

const CheckInScreen = () => {
  const [myVisits, setMyVisits] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await SecureStore.getItemAsync('access_token');
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const response = await axios.get('https://monaledge.com:8888/users/my_visit', { headers });
        const data = response.data;
        setMyVisits(data);
      } catch (error) {
        console.log('データの取得に失敗しました:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {myVisits.map((visit) => (
        <OnsenCardComponent visit={visit} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6
  },
  card: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginRight: 8,
    fontSize: 16,
  },
  value: {
    flex: 1,
    fontSize: 16,
  },
});

export default CheckInScreen;