// AuthScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import MainApp from './MainApp';

const AuthScreen = ({ navigation }) => {

  const [user, setUser] = useState({
    id: 1,
    username: 'exampleUser',
    email: 'user@example.com',
    // Other user data you want to include
  });
  

  const handleLogin = () => {
    // Implement your login logic here
    // For simplicity, let's assume the user is logged in after clicking the login button
    //navigation.replace('MainApp'); // Navigate to the main app screen
    navigation.navigate('MainApp')
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text>Login/Signup Screen</Text>
        <TextInput style={styles.input} placeholder="Username" />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry />
       
        <View style={styles.container}>
      <TouchableOpacity onPress={handleLogin} style={styles.greenButton}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
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
  formContainer: {
    width: '80%', // Adjust width as needed
  },
  input: {
    marginBottom: 16, // Add some spacing between input fields
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

export default AuthScreen;
