import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

const FooterBar = () => {

  const navigation = useNavigation();

  const handlePlusSquarePress = () => {
    navigation.navigate('PostJobAd');
  };

  const handleSearch = () => {
    navigation.navigate('SearchForJobs');
  }

  return (
    <View style={styles.footer}>
      
      <TouchableOpacity onPress={handlePlusSquarePress}>
        <Icon name="plus-square" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSearch}>
        <Icon name="search" size={30} color="white" />
      </TouchableOpacity>
      <Icon name="envelope" size={30} color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: 'green',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around', // Space items evenly along the axis
    flexDirection: 'row', // Align items horizontally
    position: 'absolute',
    bottom: 0,
  },
  footerText: {
    color: 'white',
    fontSize: 18,
  },
});

export default FooterBar;