import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PostCard from './PostCard';

const PostJobAd = ({ route }) => {

  const user = route.params?.user;
  const navigation = useNavigation();
  const [userid, setUserId] = useState(user.userid)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [userJobAds, setUserJobAds] = useState([]);

  useEffect(() => {
    console.log("Received User in PostJobAd:", userid);
  }, []);

  const handleSave = async () => {
    // Perform any validation or processing of the input data here
    const jobAd = {
      userid,
      title,
      description,
      budget: parseFloat(budget) || 0, // Convert budget to a number or set to 0 if it's not a valid number
    };
  
    try {
      // Make a POST request to save the job ad
      const response = await fetch('http://localhost:3000/post-postads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobAd),
      });
  
      const data = await response.json();
  
      if (data.message === 'success') {
        // Show a success alert
        Alert.alert('Success', 'Job Ad saved successfully', [
          {
            text: 'OK',
            onPress: () => {
              // Navigate back to the MainApp component
              // navigation.navigate('MainApp', { user });
              navigation.goBack();
            },
          },
        ]);
      } else {
        // Show an error alert with the error message
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      // Show an alert for any unexpected errors
      Alert.alert('Error', 'Failed to save job ad. Please try again.');
    }
  };
  

  const handleBack = () => {
    //navigation.navigate('MainApp', {user})
    navigation.goBack()
  }

  const fetchUserJobAds = async () => {
    try {
      // Assuming route.params.user.userid is the current user's ID
      //const userId = route.params.user.userid;
      const response = await fetch(`http://localhost:3000/get-jobads/${userid}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // Assuming data is an array of job ads
      console.log('User Job Ads:', data);
      // Set the fetched job ads to state
      setUserJobAds(data);
    } catch (error) {
      console.error('Error fetching user job ads:', error);
    }
  };

  useEffect(() => {
    // Fetch user job ads when the component mounts
    fetchUserJobAds();
  }, []); 

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Post Job Ad</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the job title"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter job description"
        value={description}
        onChangeText={setDescription}
        multiline={true}
      />

      <Text style={styles.label}>Estimated Budget:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter estimated budget"
        value={budget}
        onChangeText={setBudget}
        keyboardType="numeric"
      />

      <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={handleSave} style={styles.greenButton}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleBack} style={styles.secondaryButton}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>

      {/* Section for My Job Post */}
      <View style={styles.myJobPostContainer}>
        <Text style={styles.myJobPostHeader}>My Job Post</Text>
        {/* Display user's job ads here */}
        {/* Display user's job ads here */}
        {userJobAds.map((jobAd) => (
          <PostCard
          key={jobAd._id}  // Assuming '_id' is the unique identifier
          title={jobAd.title}
          content={jobAd.description}
          estimatedBudget={jobAd.budget}
        />
        ))}
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
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  myJobPostContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  myJobPostHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default PostJobAd;
