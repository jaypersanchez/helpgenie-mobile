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
import { useUser } from './UserContext';

const MainApp = ({route}) => {
    
  const navigation = useNavigation();
  const { user } = useUser()
  console.log(`MainApp useUser ${JSON.stringify(user)}`)
  //const { user } = route.params;
  const [jobAds, setJobAds] = useState([]);
  
  useFocusEffect(
        useCallback(() => {
          if (user?.email) {
            console.log(`MainApp USER ${JSON.stringify(user)}`)
            console.log(`MainApp User State ${user.data.userid}::${user.data.email}::${user.data.userid}::${user.data.token}`)
          }
        }, [])
  );

  useFocusEffect(
    useCallback(() => {
      getJobAds()
    }, [])
);
  useEffect(() => {
    
    // Listen for changes in navigation parameters
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      // Access the search results from the navigation parameters
      const searchResults = e.data?.params?.searchResults;
      // Get the number of items in transformedData
      const numberOfItems = searchResults.length;
      //console.log(`Found ${numberOfItems} matching jobs`)
      
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
      
      const response = await fetch('http://localhost:3000/get-postads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userid: user.data.userid }),
    });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(`getJobAds ${data}`)
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

      
    return (
      <View style={{ flex: 1 }}>
        <HeaderBar/>
        <ScrollView style={{ flex: 1 }}>
          {/* Render each card dynamically */}
          {jobAds.length > 0 ? (
            jobAds.map((jobAd) => (
              <Card
                key={jobAd.id}
                userid={user.data.userid}
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
        <FooterBar/>
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
  