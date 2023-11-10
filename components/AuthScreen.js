// AuthScreen.js
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import MainApp from './MainApp';

const AuthScreen = ({ navigation }) => {
  const handleLogin = () => {
    // Implement your login logic here
    // For simplicity, let's assume the user is logged in after clicking the login button
    navigation.replace('MainApp'); // Navigate to the main app screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text>Login/Signup Screen</Text>
        <TextInput style={styles.input} placeholder="Username" />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry />
        <Button title="Login" onPress={handleLogin} />
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
});

export default AuthScreen;
