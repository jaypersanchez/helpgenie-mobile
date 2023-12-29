import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useUser } from './UserContext';

const MessagesCard = ({ jobad, title, content }) => {

    const { user, env } = useUser()
    console.log(`MessagesCard ${JSON.stringify(user)}::${user.data.userid}::${user.bids}`)
    const [showMoreInfo, setShowMoreInfo] = useState(false);
    const [replyModalVisible, setReplyModalVisible] = useState(false);
    const [replyMessage, setReplyMessage] = useState('');
    // Set the necessary information in state
    const [replybidid, setReplyBidId] = useState(null);
    const [replybidderid, setReplyBidderId] = useState(null);
    const [replybidoid, setReplyBidOid] = useState(null)

    const handleCardPress = () => {
        // Implement the logic to show more information
        console.log(`Message Card tapped! More info for: ${title}`);
        setShowMoreInfo(!showMoreInfo);
    };

    const handleReplyPress = (bid) => {
      // Set the necessary information in state
      setReplyBidId(bid._id);
      setReplyBidderId(bid.bidderId);
      setReplyBidOid(jobad._id);
      setReplyModalVisible(true);
    };

    const handleSendMessage = () => {
      // Construct the endpoint URL based on jobad and current user
      const endpoint = `${env.apiUrl}/job/${replybidoid}/bid/${replybidid}/message`;
      // Construct the request body
      const requestBody = {
        senderId: user.data.userid,
        receiverId: replybidderid,
        message: replyMessage,
      };
      console.log(`sendinginfo ${replybidoid}::${replybidderid}`)
      //console.log(`sendinginfo ${jobad._id.$oid}/bid/${jobad._id.$oid}::${senderId}::${receiverId}::${message}`)
      // Send the message using fetch or your preferred method
      fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle success or error
          console.log('Reply sent:', data);
  
          // Close the modal
          setReplyModalVisible(false);
        })
        .catch((error) => {
          console.error('Error sending reply:', error);
        });
    };

    const handleRewardPress = (jobId, bidId) => {
      // Construct the endpoint URL based on jobad and bid
      console.log(`Reward to ${jobId}/${bidId}`)
      const endpoint = `${env.apiUrl}/job/reward-bid/${jobId}/${bidId}`;
    
      // Send the reward request using fetch or your preferred method
      fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle success or error
          console.log('Bid rewarded:', data);
        })
        .catch((error) => {
          console.error('Error rewarding bid:', error);
        });
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
              <View key={bid._id.$oid} style={{ marginBottom:20}} >
                <Text>Bidder ID: {bid.bidderId}</Text>
                <Text>Bidder Name: {bid.firstname}</Text>
                <Text>Bid Amount: {bid.bidAmount}</Text>

                {/* Display messages for the bidder */}
                {bid.messages && bid.messages.length > 0 && (
                  <View style={{ marginBottom:20}}>
                    <Text>Messages:</Text>
                    {bid.messages.map((message) => (
                      <View key={message._id.$oid}>
                        <Text>{message.senderId.$oid}</Text>
                        <Text>{message.message}</Text>
                        
                        {/* Add a reply button */}
                        <TouchableOpacity onPress={()=>handleReplyPress(bid)}
                            style={{
                              borderWidth: 1,
                              borderColor: 'darkgreen',
                              borderRadius: 5, // Optional: You can adjust the border radius
                            }}
                        >
                          <Text style={{ fontWeight: 'bold', color: 'darkblue' }}>Reply</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}

                 {/* Reward button */}
                <TouchableOpacity onPress={() => handleRewardPress(jobad._id, bid._id)} style={{
                  borderWidth: 1,
                  borderColor: 'darkgreen',
                  borderRadius: 5, // Optional: You can adjust the border radius
                }}>
                  <Text style={{ fontWeight: 'bold', color: 'darkgreen', padding:5 }}>Reward</Text>
                </TouchableOpacity>
              </View>
            ))}

           

          </View>
        )}
      </View>

      {/* Modal for replying to a message */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={replyModalVisible}
        onRequestClose={() => setReplyModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setReplyModalVisible(false)}
          >
            <Text>X</Text>
          </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Type your reply..."
              onChangeText={(text) => setReplyMessage(text)}
              value={replyMessage}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleSendMessage}>
              <Text>Send Reply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    zIndex: 2, // Increase the zIndex
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
    borderRadius: 20, // Make it circular
  },
});

export default MessagesCard;
