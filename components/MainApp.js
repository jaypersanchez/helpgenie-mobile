import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HeaderBar from './HeaderBar';
import FooterBar from './FotterBar';
import Card from './PostCard'
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native'; 

const MainApp = () => {
    
  const navigation = useNavigation();
    const route = useRoute();
    const user = route.params?.user;

    useFocusEffect(
        useCallback(() => {
          if (user?.email) {
            console.log(`MainApp User State ${user.id}::${user.username}::${user.email}`)
          }
        }, [])
      );

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
      <View style={{ flex: 1 }}>
        <HeaderBar />
        <ScrollView style={{ flex: 1 }}>
          {/* Render each card */}
          {cards.map((card) => (
            <Card key={card.id} title={card.title} content={card.content} estimatedBudget={card.estimatedBudget} />
          ))}
        </ScrollView>
        <FooterBar />
        <StatusBar style="auto" />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mainContent: {
      flex: 1, // Takes the remaining space
      width: '100%', // Take full width
      paddingHorizontal: 16, // Padding on the sides
    },
  });

  export default MainApp;
  