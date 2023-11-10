import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
//import SearchForJobs from './SearchForJobs'; // Import the SearchForJobs component

const SearchForJobs = ( {navigation} ) => {

    const [searchString, setSearchString] = useState()

  const handleSearch = () => {
    // Implement your search logic here
    console.log(`Searching for jobs with keyword: ${searchString}`);
    // You can update your state or perform any other actions here
    //navigation.navigate('MainApp');
    Alert.alert('Success', 'Searching for Jobs Done!')
  };

  const handleBack = () => {
    navigation.navigate('MainApp')
  }

  return (
    <View style={styles.container}>
      
      <TextInput
        style={styles.input}
        placeholder="Enter your keywords to search..."
        value={searchString}
        onChangeText={setSearchString}
      />

      <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={handleSearch} style={styles.greenButton}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleBack} style={styles.secondaryButton}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
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
    label: {
      fontSize: 16,
      marginBottom: 5,
    },
    input: {
      fontSize: 16,
      marginBottom: 20,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
    },
    greenButton: {
      backgroundColor: 'green',
    width: 200,
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'center',
    },
    buttonText: {
      color: 'white', // Set the text color to white for better visibility on a green background
      textAlign: 'center', // Center the text horizontally
      fontSize: 18,
    },
    secondaryButton: {
      backgroundColor: 'green', // Change the background color as needed
      width: 200,
      height: 50,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 5,
      alignSelf: 'center',
    },
    buttonContainer: {
      flexDirection: 'row', // Arrange buttons horizontally
      justifyContent: 'space-between', // Space them apart
      width: '100%', // Take the full width
    },
  });

export default SearchForJobs;
