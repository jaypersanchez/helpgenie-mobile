import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
//import SearchForJobs from './SearchForJobs'; // Import the SearchForJobs component

const SearchForJobs = ( {navigation} ) => {

    const [searchString, setSearchString] = useState()

  const handleSearch = () => {
    // Implement your search logic here
    console.log(`Searching for jobs with keyword: ${searchString}`);
    // You can update your state or perform any other actions here
    navigation.navigate('MainApp');
  };

  return (
    <View style={styles.container}>
      
      <TextInput
        style={styles.input}
        placeholder="Enter your keywords to search..."
        value={searchString}
        onChangeText={setSearchString}
      />
      <TouchableOpacity onPress={handleSearch} style={styles.greenButton}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
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
      backgroundColor: 'green', // Set the background color to green
      width: 200, // Set the width
      height: 50,  // Set the height
      paddingVertical: 10, // Add vertical padding
      paddingHorizontal: 10, // Add horizontal padding
      borderRadius: 5, // Optional: Add rounded corners to the button
      alignSelf: 'center', // Center the button horizontally
      marginTop: 5, // Add some top margin for spacing
      marginTop: 200,
    },
    buttonText: {
      color: 'white', // Set the text color to white for better visibility on a green background
      textAlign: 'center', // Center the text horizontally
      fontSize: 18,
    },
  });

export default SearchForJobs;
