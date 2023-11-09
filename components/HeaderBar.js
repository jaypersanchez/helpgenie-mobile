import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const HeaderBar = () => {
  return (
    <View style={styles.header}>
      <Image
        source={require('../assets/HelpGenie_Logo2.png')} // Adjust the path as needed
        style={styles.rightIcon}
      />
        <Text style={styles.headerText}>Help Genie</Text>
      <Image
        source={require('../assets/code_ninja.jpeg')} // Adjust the path as needed
        style={styles.rightIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'green',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 55, // Adjusted margin to avoid overlapping with system indicators
    flexDirection: 'row',
    justifyContent: 'space-between', // Updated to space-between
  },
  headerText: {
    color: 'white',
    fontSize: 18,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10, // Margin between icon and text
  },
  rightIcon: {
    width: 40,
    height: 40,
    
  },
});

export default HeaderBar;
