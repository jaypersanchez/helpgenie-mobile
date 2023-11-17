import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HeaderBar from './HeaderBar';
import FooterBar from './FotterBar';
import Card from './PostCard'
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native'; 
const UserContext = React.createContext();

const MainApp = ({route}) => {

    
  const navigation = useNavigation();
    
  const { user } = route.params;
  const [jobAds, setJobAds] = useState([]);

  useFocusEffect(
        useCallback(() => {
          if (user?.email) {
            console.log(`MainApp User State ${user.userid}::${user.email}::${user.userid}::${user.token}`)
          }
        }, [])
  );

  useFocusEffect(
    useCallback(() => {
      getJobAds()
    }, [])
);
  useEffect(() => {
    // Refetch job ads when the screen comes into focus
    //getJobAds();
  
    // Listen for changes in navigation parameters
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      // Access the search results from the navigation parameters
      const searchResults = e.data?.params?.searchResults;
      // Get the number of items in transformedData
      const numberOfItems = searchResults.length;
      console.log(`Found ${numberOfItems} matching jobs`)
      
      if (searchResults && setJobAds) {
        // Update the jobAds state with the search results
        console.log(`refreshing search result list`);
        setJobAds(searchResults);
      }
    });
  
    // Clean up the listener when the component unmounts
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [navigation]);
  

  const getJobAds = async () => {
    try {
      const response = await fetch('http://localhost:3000/get-postads');
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      // Assuming data is an array of job ads
      const transformedData = data.map(jobAd => ({
        id: jobAd._id,
        title: jobAd.title,
        description: jobAd.description,
        budget: jobAd.budget,
      }));
      
      setJobAds(transformedData); // Assuming setJobAds is a state update function
    } catch (error) {
      console.error('Error:', error);
      // Handle the error, e.g., show an alert to the user
    }
  };

    // Dummy data for 5 cards
    const cards = [
      { id: 1, title: 'Septic Tank Siphoning', content: 'Need to clean my septic tank', estimatedBudget: "P500" },
      { id: 2, title: 'Engineer and Architect', content: 'Looking for an Engineer and Architect to help build our house', estimatedBudget: "P500" },
      { id: 3, title: 'Underground water suppy', content: 'Need to have deep well water source for drinking', estimatedBudget: "P500" },
      { id: 4, title: 'Auto mechanic', content: 'Kailangan po namin local auto mechanic para sa owner po namin', estimatedBudget: "P500" },
      { id: 5, title: 'Custom cabinets', content: 'Gusto po naming mag pagawa ng custom cabinets para sa kuwarto at kusina', estimatedBudget: "P500" },
      { id: 6, title: 'Roofing', content: 'Kailangan mag lagay ng bubong sa roof top deck namin po', estimatedBudget: "P500" },
      { id: 7, title: 'Painting service', content: 'Kailangan po pa paint yung labas ng bahay po namin', estimatedBudget: "P500" },
      { id: 8, title: 'Septic Tank Siphoning', content: 'Need to clean my septic tank', estimatedBudget: "P500" },
      { id: 9, title: 'Auto mechanic', content: 'Kailangan po namin local auto mechanic para sa owner po namin', estimatedBudget: "P500" },
      { id: 10, title: 'Full time security guard', content: 'Naghahanap ng night time security guard', estimatedBudget: "P500" },
    ];
  
    return (
      <View style={{ flex: 1 }}>
        <HeaderBar user={user}/>
        <ScrollView style={{ flex: 1 }}>
          {/* Render each card dynamically */}
          {jobAds.length > 0 ? (
            jobAds.map((jobAd) => (
              <Card
                key={jobAd.id}
                userid={user.userid}
                jobid={jobAd.id}
                title={jobAd.jobTitle || jobAd.title || 'Default Title'}
                content={jobAd.jobDescription || jobAd.description || 'Default Description'}
                estimatedBudget={jobAd.budgetEstimate || jobAd.budget || 'Default Budget'}
              />
            ))
          ) : (
            <Text>Loading...</Text>
          )}
        </ScrollView>
        <FooterBar user={user} />
        <StatusBar style="auto" />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mainContent: {
      flex: 1, // Takes the remaining space
      width: '100%', // Take full width
      paddingHorizontal: 16, // Padding on the sides
    },
  });

  export default MainApp;
  