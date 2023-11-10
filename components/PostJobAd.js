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

  const handleBack = () => {
    navigation.navigate('MainApp')
  }

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
});

export default PostJobAd;
