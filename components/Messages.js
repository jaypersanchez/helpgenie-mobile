import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import MessagesCard from './MessagesCard';
import { useNavigation } from '@react-navigation/native';

const Messages = ( {route} ) => {

    const user = route.params;
    const navigation = useNavigation();

    // Dummy data for 5 cards
    const cards = [
        { id: 1, title: 'Septic Tank Siphoning', content: 'Need to clean my septic tank', estimatedBudget: "P500" },
        { id: 2, title: 'Engineer and Architect', content: 'Looking for an Engineer and Architect to help build our house', estimatedBudget: "P500" },
        { id: 3, title: 'Underground water suppy', content: 'Need to have deep well water source for drinking', estimatedBudget: "P500" },
        { id: 4, title: 'Auto mechanic', content: 'Kailangan po namin local auto mechanic para sa owner po namin', estimatedBudget: "P500" },
        { id: 5, title: 'Custom cabinets', content: 'Gusto po naming mag pagawa ng custom cabinets para sa kuwarto at kusina', estimatedBudget: "P500" },
        { id: 6, title: 'Roofing', content: 'Kailangan mag lagay ng bubong sa roof top deck namin po', estimatedBudget: "P500" },
        { id: 7, title: 'Painting service', content: 'Kailangan po pa paint yung labas ng bahay po namin', estimatedBudget: "P500" },
        { id: 8, title: 'Septic Tank Siphoning', content: 'Need to clean my septic tank', estimatedBudget: "P500" },
        { id: 9, title: 'Auto mechanic', content: 'Kailangan po namin local auto mechanic para sa owner po namin', estimatedBudget: "P500" },
        { id: 10, title: 'Full time security guard', content: 'Naghahanap ng night time security guard', estimatedBudget: "P500" },
      ];

      return (
        <View style={styles.container}>
          
          <ScrollView style={{ flex: 1 }}>
            {/* Render each card */}
            {cards.map((card) => (
              <MessagesCard key={card.id} title={card.title} content={card.content} />
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

export default Messages;