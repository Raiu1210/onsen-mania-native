import React, { useEffect, useState } from 'react';
import { View, ScrollView , StyleSheet, RefreshControl, Text, Button, Alert } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { useNavigation, useIsFocused } from '@react-navigation/native';

// components
import BarChartComponent from '../BarChartComponent';
import ProgressChartComponent from '../ProgressChartComponent';

const RecordScreen = () => {
  const [myVisits, setMyVisits] = useState([]);
  const [onsenList, setOnsenList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
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
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const handleUserDelete = async () => {
    try {
      const accessToken = await SecureStore.getItemAsync('access_token');
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.get('https://monaledge.com:8888/users/delete', { headers });
      if (response.status === 200) {
        // ユーザ削除成功
        Alert.alert('ユーザ削除', 'ユーザを削除しました。再度アプリを利用する際は、新しくアカウントの作成が必要です');
        await SecureStore.deleteItemAsync('access_token');
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log('ユーザ削除に失敗しました:', error);
      // エラーハンドリングを行うこともできます
    }
  };

  const confirmUserDelete = () => {
    Alert.alert('ユーザ削除', 'ユーザを削除しますか？ この操作を実行してしまうと取り消すことはできません', [
      {
        text: 'キャンセル',
        style: 'cancel',
      },
      {
        text: '削除',
        onPress: handleUserDelete,
        style: 'destructive',
      },
    ]);
  };

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync('access_token');
      navigation.navigate('Login');
    } catch (error) {
      console.error('ログアウト時のエラー:', error);
    }
  };


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
          <Button title="ログアウト" onPress={handleLogout} color="#FF0000" />
          <Button title="ユーザ削除" onPress={confirmUserDelete} color="#FF0000" />
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
