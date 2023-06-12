import React from "react";
import { StyleSheet, View, Text, Image, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const OnsenCardComponent = ({ visit }) => {

  const timeConvert = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    // 年月日の取得
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1;
    const day = dateTime.getDate();

    // 出力の組み立て
    const formattedDateTime = `${year}年${month}月${day}日`;

    return formattedDateTime;
  };

  const handleCall = async (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const handleOpenWeb = async (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.cardTitle}>{visit.name}</Text>
      </View>
      
      <Image source={{ uri: "https://monaledge.com:8888/thumbnails/" + visit.image_path }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.label}>住所 : </Text>
        <Text style={styles.value}>{visit.address}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>記録日時 : </Text>
        <Text style={styles.value}>{timeConvert(visit.created_at)}</Text>
      </View>
      
      {/* each action button */}
      <View style={styles.buttonContainer}>
        {visit.tel && (
          <Ionicons style={styles.actionButton} name={'call'} size={48} color="green" onPress={() => handleCall(visit.tel)} />
        )}
        
        {visit.url && (
          <Ionicons style={styles.actionButton} name={'globe-outline'} size={48} color="blue" onPress={() => handleOpenWeb(visit.url)} />
        )}
      </View>
    </View>
  );
};

export default OnsenCardComponent;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    elevation: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginBottom: 6
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
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
});