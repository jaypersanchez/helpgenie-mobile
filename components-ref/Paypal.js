import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Settings = ( {navigation} ) => {

    

  return (
    <View style={styles.container}>
      
      <Text>Settings</Text>
      <PayPalScriptProvider options={{ "client-id": "sb" }}>
            <PayPalButtons />
        </PayPalScriptProvider>
      <TouchableOpacity onPress={() => navigation.navigate('MainApp')} style={styles.greenButton}>
            <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 55,
      bottom: 0
    },
    mainContent: {
      flex: 1, // Takes the remaining space
      width: '100%', // Take full width
      paddingHorizontal: 16, // Padding on the sides
    },
    greenButton: {
        backgroundColor: 'green', // Set the background color to green
        width: 100, // Set the width
        height: 50,  // Set the height
        paddingVertical: 10, // Add vertical padding
        paddingHorizontal: 10, // Add horizontal padding
        borderRadius: 5, // Optional: Add rounded corners to the button
        alignSelf: 'center', // Center the button horizontally
        marginTop: 5, // Add some top margin for spacing
        marginTop: 18,
      },
      buttonText: {
        color: 'white', // Set the text color to white for better visibility on a green background
        textAlign: 'center', // Center the text horizontally
        fontSize: 18,
      },
  });

export default Settings;
