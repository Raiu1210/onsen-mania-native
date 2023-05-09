import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const CheckInScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Check-In Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CheckInScreen;