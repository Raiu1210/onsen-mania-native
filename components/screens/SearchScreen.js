import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';


const SearchScreen = () => {
  const [myVisits, setMyVisits] = useState([]);
  const [onsenList, setOnsenList] = useState([]);
  const [selectedOnsen, setSelectedOnsen] = useState(null);
  const [location, setLocation] = useState(null);

  
  const getLocationAsync = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        setLocation({
          "latitude": 35.68432953217299,
          "longitude": 139.7528818864777,
        })
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    } catch (console) {
      setLocation({
        "latitude": 35.68432953217299,
        "longitude": 139.7528818864777,
      })
    }
  };


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

    } catch (error) {
      console.log('データの取得に失敗しました:', error);
    }
  };

  useEffect(() => {
    fetchData();
    getLocationAsync();
  }, []);

  const handleMarkerPress = async (onsen) => {
    const onsenDetailResponse = await axios.get(`https://monaledge.com:8888/onsen/onsen_detail?onsen_id=${onsen.id}`);
    setSelectedOnsen(onsenDetailResponse.data);
  };

  const closeCard = () => {
    setSelectedOnsen(null)
  };

  const tweetOnsen = async (onsen) => {
    const shareUrl = 'https://apps.apple.com/jp/app/%E6%B8%A9%E6%B3%89%E3%83%9E%E3%83%8B%E3%82%A2/id6449859396'
    const text = `${onsen.name}に来たよ！ \n\n\n#温泉マニア \n#温泉 \n#${onsen.name}\n\n`
    const href = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${text}`
    Linking.openURL(href);
  }

  const checkIn = async (onsen) => {
    try {
      const token = await SecureStore.getItemAsync('access_token');
      const response = await axios.post(
        'https://monaledge.com:8888/users/checkin',
        { onsen_id: onsen.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.result == 0) {
        Alert.alert('成功', 'チェックインが成功しました。温泉に来たことをツイートしませんか？',
        [
          { text: 'しない', style: 'cancel' },
          { text: 'ツイート', onPress: () => tweetOnsen(onsen) },
        ]);
      } else {
        Alert.alert('エラー', 'チェックインに失敗しました');
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response2 = await axios.get('https://monaledge.com:8888/users/my_visit', { headers });
      const data = response2.data;
      setMyVisits(data);
    } catch (error) {
      console.error('エラー:', error);
    }
  }

  const handleCheckIn = async (onsen) => {
    Alert.alert(
      'チェックイン',
      'この温泉への訪問を記録しますか？',
      [
        { text: 'キャンセル', style: 'cancel' },
        { text: 'チェックイン', onPress: () => checkIn(onsen) },
      ]
    );
  };
  const handleCall = async (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const handleOpenWeb = async (url) => {
    Linking.openURL(url);
  };

  if (!location) {
    return (
    <View style={{ flex: 1 }} >
      <Text>Loading...</Text>
    </View>);
  }


  return (
    <View style={{ flex: 1 }}>
      <MapView
          style={{ flex: 1 }}
          showsUserLocation={true}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}
        >
          {onsenList.map((onsen, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: onsen.lat,
                longitude: onsen.lon,
              }}
              title={onsen.name}
              description={onsen.address}
              pinColor={myVisits.some((visit) => visit.onsen_id === onsen.id) ? 'blue' : 'red'}
              onPress={() => handleMarkerPress(onsen)}
            />
        ))}
      </MapView>

      {selectedOnsen && (
        <View style={styles.card}>
          <View style={styles.info}>
            <Text style={styles.cardTitle}>{selectedOnsen.name}</Text>
            <View style={styles.buttonSpacer} />
            <TouchableOpacity style={styles.closeButton} onPress={closeCard}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
          
          <Image source={{ uri: "https://monaledge.com:8888/thumbnails/" + selectedOnsen.image_path }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.label}>住所 : </Text>
            <Text style={styles.value}>{selectedOnsen.address}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>定休日 : </Text>
            <Text style={styles.value}>{selectedOnsen.off_day}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>営業時間 : </Text>
            <Text style={styles.value}>{selectedOnsen.open_time}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>駐車場  : </Text>
            <Text style={styles.value}>{selectedOnsen.parking}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>サウナ  : </Text>
            <Text style={styles.value}>{selectedOnsen.sauna}</Text>
          </View>
          
          {/* each action button */}
          <View style={styles.buttonContainer}>
            <Ionicons style={styles.actionButton} name={'checkmark-circle'} size={48} color="green" onPress={() => handleCheckIn(selectedOnsen)} />
            {selectedOnsen.tel && (
              <Ionicons style={styles.actionButton} name={'call'} size={48} color="green" onPress={() => handleCall(selectedOnsen.tel)} />
            )}
            
            {selectedOnsen.url && (
              <Ionicons style={styles.actionButton} name={'globe-outline'} size={48} color="blue" onPress={() => handleOpenWeb(selectedOnsen.url)} />
            )}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  closeButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    borderRadius: 12,
    marginBottom: 8
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonSpacer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  actionButton: {
    marginRight: 16,
  }
});

export default SearchScreen;