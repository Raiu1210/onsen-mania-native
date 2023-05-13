import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import DropDownPicker from 'react-native-dropdown-picker';

const BarChartComponent = ({ myVisits }) => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [uniqueYears, setUniqueYears] = useState([]);

  useEffect(() => {
    const years = [...new Set(myVisits.map((visit) => new Date(visit.created_at).getFullYear()))];
    const yearsData = years.map((year) => ({ label: year.toString(), value: year }))
    
    setUniqueYears(yearsData);
    filterDataByYear(year);
  }, [myVisits]);

  const countDataByMonth = (data) => {
    const counts = {};

    data.forEach((visit) => {
      const createdAt = new Date(visit.created_at);
      const month = createdAt.getMonth() + 1;

      if (counts[month]) {
        counts[month] += 1;
      } else {
        counts[month] = 1;
      }
    });

    return counts;
  };

  const filterDataByYear = (year) => {
    const filteredData = myVisits.filter((visit) => {
      const createdAt = new Date(visit.created_at);
      return createdAt.getFullYear() === year;
    });
    const counts = countDataByMonth(filteredData);
    const monthlyVisitCount = {};
    for (let i = 1; i <= 12; i++) {
      monthlyVisitCount[i.toString()] = counts[i.toString()] || 0;
    }

    setMonthlyData(monthlyVisitCount);
  };

  const formatYLabel = (value) => {
    return Math.round(value).toString();
  };

  const handleYearSelected = (year) => {
    filterDataByYear(year);
  };


  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>月別温泉訪問回数</Text>
        <BarChart
          data={{
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            datasets: [{ data: Object.values(monthlyData) }],
          }}
          width={Dimensions.get('window').width * 0.85}
          height={200}
          yAxisLabel=""
          chartConfig={{
            backgroundGradientFrom: '#5076A9',
            backgroundGradientTo: '#5076A9',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            strokeWidth: 2,
            barPercentage: 0.3,
            useShadowColorFromDataset: false,
            formatYLabel: formatYLabel,
          }}
          style={styles.barGraph}
        />
        <DropDownPicker
          open={open}
          value={year}
          items={uniqueYears}
          setOpen={setOpen}
          setValue={setYear}
          containerStyle={styles.dropdownContainer}
          onChangeValue={handleYearSelected}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#1D3A65',
    padding: 16,
    borderRadius: 8,
    width: '95%',
    elevation: 3,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  barGraph: { 
    alignSelf: 'left',
    marginVertical: 8,
    borderRadius: 16,
  },
  dropdownContainer: {
    height: 40,
    width: 150,
    alignSelf: 'center',
  },
});

export default BarChartComponent;