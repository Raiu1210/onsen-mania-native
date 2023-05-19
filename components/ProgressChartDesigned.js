import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';

const ProgressChartDesigned = ({ onsenList, myVisits, pref }) => {
  var totalOnsenCount = 1;
  var visitedOnsenCount = 1;
  var data = {
    labels: ['訪問済み'],
    data: [0],
  };
  
  if (pref === '全国') {
    totalOnsenCount = onsenList.length;
    const visitCounts = {};
    myVisits.forEach((visit) => {
      const onsenId = visit.onsen_id;
      visitCounts[onsenId] = visitCounts[onsenId] ? visitCounts[onsenId] + 1 : 1;
    });
    visitedOnsenCount = Object.keys(visitCounts).length;
    data.data[0] = visitedOnsenCount / totalOnsenCount;
  } else {
    var prefFilteredOnsen = []
    onsenList.forEach((onsen) => {
      if(onsen.pref == pref) {
        prefFilteredOnsen.push(onsen)
      }
    });
    totalOnsenCount = prefFilteredOnsen.length;

    const visitCounts = {};
    myVisits.forEach((visit) => {
      if(visit.pref == pref) {
        const onsenId = visit.onsen_id;
        visitCounts[onsenId] = visitCounts[onsenId] ? visitCounts[onsenId] + 1 : 1;
      }
    });
    visitedOnsenCount = Object.keys(visitCounts).length;
    data.data[0] = visitedOnsenCount / totalOnsenCount;

    console.log(data)
  }

  
  return (
    <View style={styles.container}>
      <ProgressChart
        data={data}
        width={Dimensions.get('window').width * 0.27}
        height={100}
        strokeWidth={16}
        radius={30}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#1D3A65',
          backgroundGradientTo: '#1D3A65',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        hideLegend={true}
        style={styles.progressChart}
      />
      <Text style={styles.cardTitle}>{pref.replace("県", "").replace("府", "")}</Text>
      <Text style={styles.detail}>({visitedOnsenCount}/{totalOnsenCount})</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  detail: { 
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 16,

  },
});

export default ProgressChartDesigned;