import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import DropDownPicker from 'react-native-dropdown-picker';

// components
import BarChartComponent from '../BarChartComponent';

const RecordScreen = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(new Date().getFullYear().toString());
  const [uniqueYears, setUniqueYears] = useState([]);

  const [accessToken, setAccessToken] = useState('');
  const [myVisits, setMyVisits] = useState([]);
  const [onsenList, setOnsenList] = useState([]);

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

        const years = [...new Set(data.map((visit) => new Date(visit.created_at).getFullYear().toString()))];
        const yearsData = years.map((year) => ({ label: year, value: year }))
        setUniqueYears(yearsData);

        const onsenResponse = await axios.get('https://monaledge.com:8888/onsen/onsen_list');
        const onsenData = onsenResponse.data;
        setOnsenList(onsenData);
      } catch (error) {
        console.log('データの取得に失敗しました:', error);
      }
    };

    fetchData();
  }, []);

  
  return (
    <View style={styles.container}>
      <BarChartComponent  myVisits={myVisits} year={parseInt(value)} />
      <DropDownPicker
        open={open}
        value={value}
        items={uniqueYears}
        setOpen={setOpen}
        setValue={setValue}
        containerStyle={styles.dropdownContainer}
      />
      <Text style={styles.text}>{parseInt(value)}</Text>
    </View>
  );
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
