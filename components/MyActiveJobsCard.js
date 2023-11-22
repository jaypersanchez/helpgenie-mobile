import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert,  Modal, TouchableHighlight, TextInput } from 'react-native';
//import ClientBidderComponent from './ClientBidderComponent';

const MyActiveJobsCard = ({ userid, jobid, title, content, estimatedBudget }) => {

    const [showMoreInfo, setShowMoreInfo] = useState(false);
    const [bidAmount, setBidAmount] = useState('');
    const [bidders, setBidders] = useState([]);
    //this is the bidderId(_id) of the User record that the client would like to message
    const [bidderInfo, setOpenBidderInfo] = useState({})
    const [messageto, setMessageTo]=useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [message, setMessage]=useState('')

    console.log(`Getting messages for jobid ${jobid} from bidder ${userid}`)

    const handleCardPress = async () => {
        // Fetch messages for bidders when the Card is tapped
        try {
            const response = await fetch(`http://localhost:3000/job/${jobid}/bid/${userid}/messages`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            else {
                console.log(`Messages for ${jobid} and ${userid} found`)
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

    const handleBidderNamePress = (bidderInfo) => {
        setOpenBidderInfo(bidderInfo);
        console.log(`handleBidderNamePress ${JSON.stringify(bidderInfo)}`)
        setMessageTo(bidderInfo)
        setModalVisible(true);
    };

    const sendMessage = async () => {
        console.log(`Sending Message To ${JSON.stringify(bidderInfo)}`)
        
        try {
            
            const messageData = {
                senderId: userid,
                receiverId: bidderInfo.bidderId,
                message: message,
            };
            const response = await fetch(`http://localhost:3000/job/${jobid}/bid/${bidderInfo.jobbidid}/message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageData),
            });
            
            if (!response.ok) {
            throw new Error(`Message submission failed with status: ${JSON.stringify(response)}`);
            }
            else {
                setModalVisible(false);
            }
        }
        catch (error) {
            console.error('Error submitting message:', error);
            // Handle the error as needed
            Alert.alert('Error', 'Failed to send message. Please try again later.');
        }
    };

    const closeModal = () => {
        setModalVisible(false);
    };

  return (
    <TouchableOpacity onPress={handleCardPress}>
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
        <Text style={styles.budget}>Estimated Budget: {estimatedBudget}</Text>

        {/* Display bidders of the project */}
        {bidders.length > 0 && (
          <View>
            <Text>Bidders:</Text>
            {bidders.map((bidder) => (
                <View key={bidder.bidderId}>
                <TouchableOpacity onPress={() => handleBidderNamePress(bidder)}>
                    <Text>{bidder.bidderName}</Text>
                </TouchableOpacity>
                
                    <Text>{bidder.bidAmount}</Text>
                
                {/* Add more bidder information as needed */}
                </View>
            ))}
          </View>
        )}

        {/* Modal for messaging */}
        <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
        >
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.title}>{messageto.bidderName}</Text>
            {/* TextInput for typing a message */}
            <TextInput
                style={styles.input}
                placeholder="Type your message..."
                // Add onChangeText to update the message state
                onChangeText={(text) => setMessage(text)}
                // Value should be the state value for the message
                value={message}
            />
            {/* Button to send the message */}
            <TouchableOpacity style={styles.modalButton} onPress={sendMessage}>
                <Text>Send Message</Text>
            </TouchableOpacity>
            
            </View>
        </View>
        </Modal>

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
    marginBottom: 20,
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
    alignItems: 'center'
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
    marginTop: 20
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default MyActiveJobsCard;
