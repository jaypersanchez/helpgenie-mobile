import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PostCard = ({ title, content, estimatedBudget }) => {

    const [showMoreInfo, setShowMoreInfo] = useState(false);

    const handleCardPress = () => {
        // Implement the logic to show more information
        console.log(`Card tapped! More info for: ${title}`);
        setShowMoreInfo(!showMoreInfo);
    };

  return (
    <TouchableOpacity onPress={handleCardPress}>
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
      <Text style={styles.budget}>{estimatedBudget}</Text>

      {/* Additional information */}
      {showMoreInfo && (
          <View>
            {/* Add more information components here */}
            <Text>Additional Information: ...</Text>
          </View>
        )}

    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderWidth: 2, // Increase the border width
  borderColor: 'green', // Set the border color
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    marginBottom: 8,
  },
  budget: {
    fontSize: 14,
    marginBottom: 8,
  },
});

export default PostCard;
