import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MenuScreen = () => {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.item} 
        onPress={() => Linking.openURL("https://monaledge.com/article/697")}
      >
        <MaterialCommunityIcons name="information-outline" size={24} color="#000" style={styles.icon} />
        <Text style={styles.title}>このアプリについて</Text>
        <View style={{ flex: 1 }} />
        <MaterialCommunityIcons name="chevron-right" size={24} color="#A9A9A9" style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.item} 
        onPress={() => navigateToScreen('MyPage')}
      >
        <MaterialCommunityIcons name="account-circle-outline" size={24} color="#000" style={styles.icon} />
        <Text style={styles.title}>マイページ</Text>
        <View style={{ flex: 1 }} />
        <MaterialCommunityIcons name="chevron-right" size={24} color="#A9A9A9" style={styles.icon} />
      </TouchableOpacity>
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

export default MenuScreen;