import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { useIsFocused } from '@react-navigation/native';

// components
import OnsenCardComponent from '../OnsenCardComponent';

const CheckInScreen = () => {
  const [myVisits, setMyVisits] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  // const isFocused = useIsFocused();

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
      }
    >
      {myVisits.map((visit, index) => (
        <OnsenCardComponent key={index} visit={visit} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6
  }
});

export default CheckInScreen;