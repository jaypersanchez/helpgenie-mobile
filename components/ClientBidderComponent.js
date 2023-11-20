// BidderInfoComponent.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const ClientBidderComponent = ({ user, bidderInfo, onUpdateBid, onRewardProject }) => {
  const [message, setMessage] = useState('');
  
  const handleUpdateBid = () => {
    // Logic to update bid amount
    const newBidAmount = 0/* Your logic to get the new bid amount */;
    onUpdateBid(bidderInfo.bidderId, newBidAmount);
  };

  const handleRewardProject = () => {
    // Logic to reward the project
    onRewardProject(bidderInfo.bidderId);
  };

  const handleSendMessage = async () => {

  }

  return (
    <View>
      <Text>{bidderInfo.bidderName}</Text>
      <Text>{bidderInfo.bidAmount}</Text>
      {/* Add more bidder information as needed */}
      
      {/* Display message input and send button for communication */}
      <TextInput
        placeholder="Type your message..."
        value={message}
        onChangeText={(text) => setMessage(text)}
      />
      <Button title="Send Message" onPress={handleSendMessage} />

      {/* Display buttons for updating bid and rewarding project */}
      {user.role === 'client' && (
        <View>
          <TextInput
            placeholder="Enter new bid amount"
            value={0}
            onChangeText={text}
          />
          <Button title="Update Bid" onPress={handleUpdateBid} />
          <Button title="Reward Project" onPress={handleRewardProject} />
        </View>
      )}
    </View>
  );
};

export default ClientBidderComponent;
