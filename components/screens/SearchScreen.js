import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const SearchScreen = () => {
  const [onsenList, setOnsenList] = useState([]);
  const [selectedOnsen, setSelectedOnsen] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const onsenResponse = await axios.get('https://monaledge.com:8888/onsen/onsen_list');
        const onsenData = onsenResponse.data;
        setOnsenList(onsenData);

      } catch (error) {
        console.log('データの取得に失敗しました:', error);
      }
    };

    fetchData();
  }, []);

  const handleMarkerPress = async (onsen) => {
    const onsenDetailResponse = await axios.get(`https://monaledge.com:8888/onsen/onsen_detail?onsen_id=${onsen.id}`);
    setSelectedOnsen(onsenDetailResponse.data);
  };

  const closeCard = () => {
    setSelectedOnsen(null)
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 33.415032749403544,
            longitude: 130.73956359560177,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}
        >
          {onsenList.map((onsen) => (
            <Marker
              key={onsen.onsen_id}
              coordinate={{
                latitude: onsen.lat,
                longitude: onsen.lon,
              }}
              title={onsen.name}
              description={onsen.address}
              onPress={() => handleMarkerPress(onsen)}
            />
        ))}
      </MapView>

      {selectedOnsen && (
        <View style={styles.card}>
          <View style={styles.info}>
            <Text style={styles.cardTitle}>{selectedOnsen.name}</Text>
            <View style={styles.buttonSpacer} />
            <View style={styles.closeButtonContainer}>
              <Button title="X" style={styles.closeButton} onPress={closeCard} />
            </View>
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
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
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
    height: 80,
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
  cardAddress: {
    fontSize: 16,
  },
  closeButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    borderRadius: 12,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButtonContainer: {
    marginLeft: 16,
  },
  buttonSpacer: {
    flex: 1,
  },
});

export default SearchScreen;