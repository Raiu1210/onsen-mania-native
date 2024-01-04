import React, { useEffect, useState } from 'react';
import { View, ScrollView , StyleSheet, RefreshControl, Text } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { useIsFocused } from '@react-navigation/native';

// components
import BarChartComponent from '../BarChartComponent';
import ProgressChartComponent from '../ProgressChartComponent';

const RecordScreen = () => {
  const [myVisits, setMyVisits] = useState([]);
  const [onsenList, setOnsenList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const fetchData = async () => {
    try {
      const accessToken = await SecureStore.getItemAsync('access_token');
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.get('https://monaledge.com:8888/users/my_visit', { headers });
      const data = response.data;
      setMyVisits(data);

      const onsenResponse = await axios.get('https://monaledge.com:8888/onsen/onsen_list');
      const onsenData = onsenResponse.data;
      setOnsenList(onsenData);
      setLoading(false)
    } catch (error) {
      console.log('データの取得に失敗しました:', error);
    }
  };

  useEffect(() => {
    if (isFocused && myVisits.length === 0) {
      fetchData();
      return ;
    }
  }, [isFocused]);


  if (loading) {
    return (<Text>loading</Text>)
  } else {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }
      >
        <View style={styles.container}>
          <BarChartComponent myVisits={myVisits} />
          <ProgressChartComponent onsenList={onsenList} myVisits={myVisits} />
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    flex: 1,
    height: 40,
    width: 150,
  },
  
});

export default RecordScreen;
