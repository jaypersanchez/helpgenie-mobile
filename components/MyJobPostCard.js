import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert,  Modal, TouchableHighlight, TextInput } from 'react-native';

const MyJobPostCard = ({ userid, jobid, title, content, estimatedBudget }) => {

    const [showMoreInfo, setShowMoreInfo] = useState(false);
    const [bidAmount, setBidAmount] = useState('');
    const [bidders, setBidders] = useState([]);
    
    const handleCardPress = async () => {
        // Fetch bidders when the Card is tapped
        try {
            const response = await fetch(`http://localhost:3000/job/${jobid}/bidders?userId=${userid}`);
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Bidders:', data);
            // Set the bidders data in the state
            setBidders(data);
        } catch (error) {
            console.error('Error fetching bidders:', error);
        }
    };

    const handleApply = () => {
      setModalVisible(true);
    };
  
    const handleBidSubmit = async () => {
      try {
        // Assume you have jobId, bidderId, and bidAmount available
        const bidData = {
          jobId: jobid,
          bidderId: userid,
          bidAmount: bidAmount,
        };
    
        const response = await fetch('http://localhost:3000/bid', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bidData),
        });
    
        if (!response.ok) {
          throw new Error(`Bid submission failed with status: ${response.status}`);
        }
    
        Alert.alert('Bid Placed', `Your bid of ${bidData.bidAmount} has been submitted successfully.`);
        setModalVisible(false);
      } catch (error) {
        console.error('Error submitting bid:', error);
        // Handle the error as needed
        Alert.alert('Error', 'Failed to submit bid. Please try again later.');
      }
    };

  return (
    <TouchableOpacity onPress={handleCardPress}>
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
        <Text style={styles.budget}>Estimated Budget: {estimatedBudget}</Text>

        {/* Display additional information */}
        {bidders.length > 0 && (
          <View>
            <Text>Bidders:</Text>
            {bidders.map((bidder) => (
              <View key={bidder.bidderId}>
                <Text>{bidder.bidderName}</Text>
                <Text>{bidder.bidAmount}</Text>
                {/* Add more bidder information as needed */}
              </View>
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>

  );
};

const styles = StyleSheet.create({
  greenButton: {
    backgroundColor: 'green',
  width: 200,
  height: 50,
  paddingVertical: 10,
  paddingHorizontal: 10,
  borderRadius: 5,
  alignSelf: 'center',
  },
  buttonText: {
    color: 'white', // Set the text color to white for better visibility on a green background
    textAlign: 'center', // Center the text horizontally
    fontSize: 18,
  },
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
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
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
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default MyJobPostCard;
