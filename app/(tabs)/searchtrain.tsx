import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Button, Keyboard } from 'react-native';
import { SearchBar } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface Station {
  label: string;
  value: string;
}

const recentSearches: Station[] = [
  { label: 'Gurgaon - All Stations, Haryana', value: 'GGN' },
  { label: 'Jodhpur - All Stations, Rajasthan', value: 'JU' },
  { label: 'Delhi - All Stations, Delhi', value: 'DL' },
  { label: 'GGN - Gurgaon, Haryana', value: 'GGN' },
  { label: 'JU - Jodhpur Junction, Rajasthan', value: 'JU' }
];

const popularSearches: Station[] = [
  { label: 'NDLS - New Delhi, Delhi', value: 'NDLS' },
  { label: 'HWH - Kolkata Howrah Junction, West Bengal', value: 'HWH' },
  { label: 'MMCT - Mumbai Central, Maharashtra', value: 'MMCT' }
];

const TrainSearchScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [stationField, setStationField] = useState<'from' | 'to' | null>(null);

  const handleSearchChange = (text: string) => {
    setSearch(text);
    if (stationField === 'from') {
      setFromStation(text);
    } else if (stationField === 'to') {
      setToStation(text);
    }
  };

  const selectStation = (station: string) => {
    if (stationField === 'from') {
      setFromStation(station);
    } else if (stationField === 'to') {
      setToStation(station);
    }
    setStationField(null);  // Reset after selection
  };

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const changeDate = (daysToAdd:number) => {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + daysToAdd);
    setDate(newDate);
  };

  const switchStations = () => {
    setFromStation(toStation);
    setToStation(fromStation);
  };

  const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

  const HandleSearchTrain = () =>{
    router.push({
      pathname: "/trainlist",
      params: {
        fromStation: "Gurgaon - All Stations",
        toStation: "Jodhpur - All Stations",
        date: "2024-11-23",
      },
    });
  }

  return (
    <ScrollView style={styles.container}>
      {stationField ? (
        <>
          <SearchBar
            placeholder={`Search ${stationField === 'from' ? 'From' : 'To'} Station`}
            onChangeText={handleSearchChange as unknown as ((text: string) => void) & (() => any)}
            lightTheme={true}
            round={true}
            value={stationField === 'from' ? fromStation : toStation}
            platform="android"
            showLoading={false}
            onClear={() => setSearch('')}
            onFocus={() => console.log('Focused')}
            onBlur={() => console.log('Blurred')}
            onCancel={() => setSearch('')}
            loadingProps={{}}
            clearIcon={{ name: 'clear', type: 'material', color: 'black' }}
            searchIcon={{ name: 'search', type: 'material', color: 'black' }}
            cancelButtonTitle="Cancel"
            cancelButtonProps={{ buttonTextStyle: { color: 'blue' }, buttonStyle: { padding: 5 } }}
            showCancel={true}
          />
          {/* Recent Searches */}
          <View>
            <Text style={styles.sectionHeader}>Recent Searches</Text>
            {recentSearches.map((station, index) => (
              <TouchableOpacity
                key={index}
                style={styles.stationItem}
                onPress={() => {
                  selectStation(station.label);
                  Keyboard.dismiss();
                }}
              >
                <Ionicons
                  name="search-outline"
                  size={15}
                  color="green"
                  style={styles.suggestionIcon}
                />
                <View style={styles.stationTextContainer}>
                  <Text style={styles.stationText}>{station.label}</Text>
                  <Text style={styles.stationSubText}>{station.value}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Popular Searches */}
          <View>
            <Text style={styles.sectionHeader}>Popular Search</Text>
            {popularSearches.map((station, index) => (
              <TouchableOpacity
                key={index}
                style={styles.stationItem}
                onPress={() => {
                  selectStation(station.label);
                  Keyboard.dismiss();
                }}
              >
                <Ionicons
                  name="train-outline"
                  size={15}
                  color="green"
                  style={styles.suggestionIcon}
                />
                <View style={styles.stationTextContainer}>
                  <Text style={styles.stationText}>{station.label}</Text>
                  <Text style={styles.stationSubText}>{station.value}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </>
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Search Train</Text>
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="train" size={24} color="green" style={styles.icon} />
            <TextInput
              style={styles.input}
              onChangeText={setFromStation}
              value={fromStation}
              onFocus={() => setStationField('from')}
              placeholder="From Station"
            />

          </View>
          {/* Switcher */}
          <View style={styles.switcherContainer}>
            <TouchableOpacity style={styles.switcher} onPress={switchStations}>
              <Ionicons name="swap-vertical" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <FontAwesome5 name="train" size={24} color="green" style={styles.icon} />
            <TextInput
              style={styles.input}
              onChangeText={setToStation}
              value={toStation}
              onFocus={() => setStationField('to')}
              placeholder="To Station"
            />

          </View>
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setShowDatePicker(true)}
          >
            <MaterialCommunityIcons
              name="calendar-month"
              size={24}
              color="green"
              style={styles.icon}
            />
            <Text style={styles.dateInput}>{formattedDate}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}

          {/* Date Navigation Buttons */}
          {/* Date Buttons */}
          <View style={styles.dateButtons}>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => changeDate(0)} // Today
            >
              <Text style={styles.dateButtonText}>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => changeDate(1)} // Tomorrow
            >
              <Text style={styles.dateButtonText}>Tomorrow</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => changeDate(2)} // Day After
            >
              <Text style={styles.dateButtonText}>Day After</Text>
            </TouchableOpacity>
          </View>
          {/* Options */}
          <View style={styles.options}>
            <TouchableOpacity style={styles.checkboxContainer}>
              <Ionicons name="checkbox-outline" size={24} color="gray" />
              <Text style={styles.optionText}>
                Get full train fare refund on cancellation
              </Text>
            </TouchableOpacity>
          </View>

          {/* Search Button */}
          <TouchableOpacity
          onPress={HandleSearchTrain}
          style={styles.searchButton}>
            <Text style={styles.searchButtonText}>SEARCH TRAINS</Text>
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <Text>IRCTC Authorized Partner</Text>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    paddingVertical: 5,
    marginTop: 10,
    marginLeft: 15,
  },
  stationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  suggestionIcon: {
    marginRight: 15,
    backgroundColor: 'rgba(0, 128, 0, 0.5)', // Green with 20% opacity
    padding: 5,
    borderRadius: 50,
    color: 'white'
  },
  stationTextContainer: {
    flex: 1,
  },
  stationText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  stationSubText: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  switcherContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: -10,
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 10,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "green",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    // position: "relative", // To allow switcher positioning relative to inputs
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  icon: {
    marginLeft: 1,
    marginRight: 15,
  },
  switcher: {
    // position: "absolute", // To position it on the right side of the inputs
    margin: 20,
    // right: 10, // Align with the right edge of the input
    // top: "50%", // Vertically center it between inputs
    // transform: [{ translateY: -20 }], // Adjust vertical alignment
    width: 40,
    zIndex: 100,
    height: 40,
    borderRadius: 20,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  dateInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  dateButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  dateButton: {
    backgroundColor: "#e8f5e9",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  dateButtonText: {
    fontSize: 14,
    color: "green",
  },
  options: {
    marginVertical: 15,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    fontSize: 14,
    marginLeft: 10,
    color: "#333",
  },
  searchButton: {
    backgroundColor: "green",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    alignItems: "center",
    marginTop: 20,
  },
});


export default TrainSearchScreen;
