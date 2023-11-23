import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PaymentMethods from './PaymentMethods';

const Settings = ( {route} ) => {

  const user = route.params;
  console.log(`SettingsTab ${JSON.stringify(user)}::${user.user.userid}`)
  const navigation = useNavigation();  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('PaymentMethods', { user })} style={styles.button}>
        <Text style={styles.buttonText}>Payment Methods</Text>
      </TouchableOpacity>

      {/* Other components or views in your PaymentScreen if needed */}

      <TouchableOpacity onPress={() => navigation.navigate('MainApp', {user})} style={styles.greenButton}>
        <Text style={styles.buttonText}>Go Back</Text>
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
  button: {
    backgroundColor: 'blue', // Adjust the color as needed
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  greenButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Settings;
