import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

const MyPageScreen = () => {
  const [me, setMe] = useState({});
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const accessToken = await SecureStore.getItemAsync('access_token');
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.get('https://monaledge.com:8888/users/me', { headers });
      const data = response.data;
      setMe(data);
      console.log(data)
    } catch (error) {
      console.log('データの取得に失敗しました:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  return (
    <View style={styles.container}>
      <Button title="ログアウト" onPress={handleLogout} color="#FF0000" />
      <Button title="ユーザ削除" onPress={confirmUserDelete} color="#FF0000" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Dark background
    paddingTop: 22,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5', // Darker item background
    padding: 20,
    marginVertical: 2,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  icon: {
    marginRight: 10, // アイコンの右にスペースを追加
  },
  title: {
    fontSize: 20,
    // fontWeight: 'bold',
    // Add more styling as needed
  },
  arrow: {
    fontSize: 24, // 矢印のサイズを調整
    color: '#000', // 矢印の色
    color: '#A9A9A9',
    // 必要に応じて他のスタイルを追加
  },
});

export default MyPageScreen;