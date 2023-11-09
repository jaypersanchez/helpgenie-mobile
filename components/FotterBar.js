import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const FooterBar = () => {
  return (
    <View style={styles.footer}>
      <Icon name="plus-square" size={30} color="white" />
      <Icon name="search" size={30} color="white" />
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
