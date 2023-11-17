import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView,
        Modal, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PostCard from './PostCard';


const SearchForJobs = ( {route} ) => {

  const user = route.params;
  const navigation = useNavigation();
  const [searchString, setSearchString] = useState()
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    console.log("Received User in SearchForJobs:", route.params?.user);
  }, []);

  const handleSearch = async () => {
    try {
      console.log(`Searching for jobs with keyword: ${searchString}`);
      
      // Make a request to the search endpoint
      const response = await fetch(`http://localhost:3000/search-ads?search=${encodeURIComponent(searchString)}`);
      
      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`Search failed with status: ${response.status}`);
      }
      
      // Parse the response data
      const data = await response.json();
      // Process the data returned from the server
      setSearchResults(data);
      
      // Process the data returned from the server
      // Assuming data is an array of job ads
      /*const transformedData = data.map(jobAd => ({
        id: jobAd._id,
        title: jobAd.title,
        description: jobAd.description,
        budget: jobAd.budget,
      }));*/
       // Get the number of items in transformedData
       const numberOfItems = data.length;
      // Show a success alert
      Alert.alert('Success', `Found ${numberOfItems} Matching Jobs`, [
        {
          text: 'OK',
          /*onPress: () => {
            // Navigate back
            navigation.goBack({
              screen: 'MainApp',
              params: {
                searchResults: transformedData,
                user: route.params.user,  // Include the user parameter
              }
            });
          },*/
        },
      ]);
    } catch (error) {
      console.error('Search error:', error);
      // Handle errors and show appropriate alerts or update state
      // For example, Alert.alert('Error', 'Search failed. Please try again.');
    }
  };

  const handleBack = () => {
    navigation.goBack()
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

        {/* Display search results below the buttons */}
        {searchResults.length > 0 && (
          <ScrollView style={{marginTop: 50}}>
            {searchResults.map((result) => (
              <PostCard
              key={result._id}
              title={result.jobTitle || result.title || 'Default Title'}
              content={result.jobDescription || result.description || 'Default Description'}
              estimatedBudget={result.budgetEstimate || result.budget || 'Default Budget'}
            />
            ))}
          </ScrollView>
        )}

    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 50
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
