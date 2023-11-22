import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MessagesCard = ({ user, jobad, title, content }) => {

    console.log(`MessagesCard ${JSON.stringify(user)}::${user.user.userid}::${user.bids}`)
    const [showMoreInfo, setShowMoreInfo] = useState(false);

    const handleCardPress = () => {
        // Implement the logic to show more information
        console.log(`Message Card tapped! More info for: ${title}`);
        setShowMoreInfo(!showMoreInfo);
    };

  return (
    <TouchableOpacity onPress={handleCardPress}>
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>

        {/* Additional information */}
        {showMoreInfo && (
          <View>
            {jobad.bids.map((bid) => (
              <View key={bid._id.$oid}>
                <Text>Bidder: {bid.bidderId}</Text>
                <Text>Bid Amount: {bid.bidAmount}</Text>

                {/* Display messages for the bidder */}
                {bid.messages && bid.messages.length > 0 && (
                  <View>
                    <Text>Messages:</Text>
                    {bid.messages.map((message) => (
                      <View key={message._id.$oid}>
                        <Text>{message.senderId.$oid}</Text>
                        <Text>{message.message}</Text>
                        {/* Add more message information as needed */}
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
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

export default MessagesCard;
