import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import MessagesCard from './MessagesCard';
import { useNavigation } from '@react-navigation/native';
import { useUser } from './UserContext';

const Messages = ( {route} ) => {

    //const user = route.params;
    const { user } = useUser()
    console.log(`MessagesTab ${JSON.stringify(user)}::${user.data.userid}`)
    const navigation = useNavigation();
    const [jobAds, setJobAds] = useState([]);

    useEffect(() => {
      // Fetch job ads data for the user
      const fetchJobAds = async () => {
        try {
          const response = await fetch(`http://localhost:3000/jobads/${user.data.userid}`);
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
    }, [user.data.userid]);


      return (
        <View style={styles.container}>
          <ScrollView style={{ flex: 1 }}>
            {/* Render each card */}
            {jobAds.map((jobad) => (
              <TouchableOpacity
                key={jobad._id.$oid}
                onPress={() => navigation.navigate('MessagesCard', { jobad })}
              >
                <MessagesCard jobad={jobad} title={jobad.title} content={jobad.description} />
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