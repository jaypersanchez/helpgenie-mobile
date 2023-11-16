import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const UserProfile = ({ navigation, route }) => {
    
  const { user } = route.params;
  const [loading, setLoading] = useState(false);  
  const [email, setEmail] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  const handleSave = () => {
    // Perform any validation or processing of the input data here
    const userProfile = {
      email,
      firstname,
      lastname,
      mobile,
      password,
      city,
      state,
      country
    };

    setLoading(true); // Show the spinner

    // Simulate an action that takes 3 seconds
    setTimeout(() => {
        // Show a success alert
        Alert.alert('Success', 'Profile saved successfully', [
            {
            text: 'OK',
            onPress: () => {
                // Navigate back to the MainApp component
                navigation.navigate('MainApp', {user});
            },
            },
        ]);
    })
    console.log(` Save user profile`)
    //onSave(jobAd); // Pass the jobAd data to the parent component
  };

  const handleBack = () => {
    navigation.navigate('MainApp', {user})
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>User Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>First Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter First Name"
        value={firstname}
        onChangeText={setFirstName}
        multiline={true}
      />

      <Text style={styles.label}>Last Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Last Name"
        value={lastname}
        onChangeText={setLastName}
      />

    <Text style={styles.label}>Mobile:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Mobile"
        value={mobile}
        onChangeText={setMobile}
      />

<Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={handleSave} style={styles.greenButton}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleBack} style={styles.secondaryButton}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={styles.spinnerText}
      />
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

export default UserProfile;
