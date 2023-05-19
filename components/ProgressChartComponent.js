import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import ProgressChartDesigned from './ProgressChartDesigned';

const ProgressChartComponent = ({ onsenList, myVisits }) => {
  // 温泉の総数
  const totalOnsenCount = onsenList.length;
  const visitCounts = {};
  myVisits.forEach((visit) => {
    const onsenId = visit.onsen_id;
    visitCounts[onsenId] = visitCounts[onsenId] ? visitCounts[onsenId] + 1 : 1;
  });
  const visitedOnsenCount = Object.keys(visitCounts).length;
  const visitedRatio = visitedOnsenCount / totalOnsenCount;

  // データセット
  const data = {
    labels: ['訪問済み'],
    data: [visitedRatio],
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>温泉訪問進捗</Text>
        <View style={styles.graphRow}>
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="全国" style={styles.progressChart} />
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="北海道" style={styles.progressChart} />
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="青森県" style={styles.progressChart} />
        </View>
        <View style={styles.graphRow}>
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="岩手県" style={styles.progressChart} />
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="宮城県" style={styles.progressChart} />
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="秋田県" style={styles.progressChart} />
        </View>
        <View style={styles.graphRow}>
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="山形県" style={styles.progressChart} />
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="福島県" style={styles.progressChart} />
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="茨城県" style={styles.progressChart} />
        </View>
        <View style={styles.graphRow}>
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="栃木県" style={styles.progressChart} />
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="群馬県" style={styles.progressChart} />
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="埼玉県" style={styles.progressChart} />
        </View>
        <View style={styles.graphRow}>
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="千葉県" style={styles.progressChart} />
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="東京都" style={styles.progressChart} />
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="神奈川県" style={styles.progressChart} />
        </View>
        <View style={styles.graphRow}>
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="新潟県" style={styles.progressChart} />
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="富山県" style={styles.progressChart} />
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="石川県" style={styles.progressChart} />
        </View>
        <View style={styles.graphRow}>
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="福井県" style={styles.progressChart} />
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="山梨県" style={styles.progressChart} />
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="長野県" style={styles.progressChart} />
        </View>
        <View style={styles.graphRow}>
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="岐阜県" style={styles.progressChart} />
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="静岡県" style={styles.progressChart} />
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="愛知県" style={styles.progressChart} />
        </View>
        <View style={styles.graphRow}>
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="三重県" style={styles.progressChart} />
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="滋賀県" style={styles.progressChart} />
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="京都府" style={styles.progressChart} />
        </View>
        <View style={styles.graphRow}>
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="大阪府" style={styles.progressChart} />
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="兵庫県" style={styles.progressChart} />
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="奈良県" style={styles.progressChart} />
        </View>
        <View style={styles.graphRow}>
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="和歌山県" style={styles.progressChart} />
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="鳥取県" style={styles.progressChart} />
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="島根県" style={styles.progressChart} />
        </View>
        <View style={styles.graphRow}>
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="岡山県" style={styles.progressChart} />
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="広島県" style={styles.progressChart} />
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="山口県" style={styles.progressChart} />
        </View>
        <View style={styles.graphRow}>
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="徳島県" style={styles.progressChart} />
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="香川県" style={styles.progressChart} />
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="愛媛県" style={styles.progressChart} />
        </View>
        <View style={styles.graphRow}>
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="高知県" style={styles.progressChart} />
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="福岡県" style={styles.progressChart} />
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="佐賀県" style={styles.progressChart} />
        </View>
        <View style={styles.graphRow}>
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="長崎県" style={styles.progressChart} />
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="熊本県" style={styles.progressChart} />
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="大分県" style={styles.progressChart} />
        </View>
        <View style={styles.graphRow}>
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="宮崎県" style={styles.progressChart} />
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="鹿児島県" style={styles.progressChart} />
          <ProgressChartDesigned onsenList={onsenList} myVisits={myVisits} pref="沖縄県" style={styles.progressChart} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },
  card: {
    backgroundColor: '#1D3A65',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  graphRow: {
    flexDirection: 'row',
    marginRight: 10
  }
});


export default ProgressChartComponent;