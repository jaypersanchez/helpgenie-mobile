import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const PostJobAd = ({ navigation, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');

  const handleSave = () => {
    // Perform any validation or processing of the input data here
    const jobAd = {
      title,
      description,
      budget: parseFloat(budget) || 0, // Convert budget to a number or set to 0 if it's not a valid number
    };

    // Show a success alert
    Alert.alert('Success', 'Job Ad saved successfully', [
        {
          text: 'OK',
          onPress: () => {
            // Navigate back to the MainApp component
            navigation.navigate('MainApp');
          },
        },
    ]);
    
    console.log(`Save Job Ad Post`)
    //onSave(jobAd); // Pass the jobAd data to the parent component
  };

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

      <TouchableOpacity onPress={handleSave} style={styles.greenButton}>
        <Text style={styles.buttonText}>Save</Text>
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

export default PostJobAd;
