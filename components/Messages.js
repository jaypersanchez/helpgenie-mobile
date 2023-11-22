import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import MessagesCard from './MessagesCard';
import { useNavigation } from '@react-navigation/native';

const Messages = ( {route} ) => {

    const user = route.params;
    console.log(`MessagesTab ${JSON.stringify(user)}::${user.user.userid}`)
    const navigation = useNavigation();
    const [jobAds, setJobAds] = useState([]);

    useEffect(() => {
      // Fetch job ads data for the user
      const fetchJobAds = async () => {
        try {
          const response = await fetch(`http://localhost:3000/jobads/${user.user.userid}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const data = await response.json();
          console.log('Job Ads:', data);
          setJobAds(data); // Set the job ads data in the state
        } catch (error) {
          console.error('Error fetching job ads:', error);
        }
      };
  
      fetchJobAds(); // Call the function when the component mounts
    }, [user.userid]);


      return (
        <View style={styles.container}>
          <ScrollView style={styles.mainContent}>
            {/* Render each card */}
            {jobAds.map((jobAd) => (
              <TouchableOpacity
                key={jobAd._id}
                onPress={() => navigation.navigate('MessagesCard', { user, jobAd })}
                style={styles.cardContainer}
              >
                <MessagesCard title={jobAd.title} content={jobAd.description} />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.greenButton}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
      </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 55,
    bottom: 0,
  },
  mainContent: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
  },
  greenButton: {
    backgroundColor: 'green',
    width: 100,
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 18,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  cardContainer: {
    marginBottom: 16, // Add margin between cards
  },
});

export default Messages;