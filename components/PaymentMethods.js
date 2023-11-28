import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from './UserContext'

const PaymentMethods = ( { route } ) => {

    const { user, env } = useUser()
    console.log(`PaymentMethodsTab ${JSON.stringify(user.data.userid)}`)
    const navigation = useNavigation();

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('GCash');
    const [paymentInfo, setPaymentInfo] = useState({
      gcash: { phone: '' },
      card: { number: '', expiry: '', name: '', cvv: '' },
      paypal: { email: '' },
    });

    const handleSave = async () => {
        // Save the payment information based on the selected method
        console.log('Saving payment info:', selectedPaymentMethod);
        if (selectedPaymentMethod === 'GCash') {
          data = {
            mobile: paymentInfo.gcash.phone,
          };
        } else if (selectedPaymentMethod === 'card') {
          data = {
            cardNumber: paymentInfo.card.number,
            cardName: paymentInfo.card.name,
            cardExpiry: paymentInfo.card.expiry,
            cardCVV: paymentInfo.card.cvv,
          };
        } else if (selectedPaymentMethod === 'Paypal') {
          data = {
            paypalEmail: paymentInfo.paypal.email,
          };
        }
        
        // Make a POST request to the endpoint
        try {

          const response = await fetch(`${env.apiUrl}/paymentmethods`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: user.data.userid, // Provide the actual user ID
              selectedPaymentMethod,
              data,
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to save payment method');
          }

          const result = await response.json();
          console.log(result.message); // Log the success message
        } catch (error) {
          console.error('Error saving payment method:', error);
        }

        // Navigate back to the Settings component
        navigation.goBack();
    };
    

  const handleSetDefault = (index) => {
    // Set the selected payment method as the default
    // (add your logic to update the default payment method in your state)
    console.log('Setting default:', selectedPaymentMethod[index]);
  };

  return (
    <View style={styles.container}>
      {/* Payment Method Selection */}
      <View style={styles.methodSelection}>
        <Button title="GCash" onPress={() => setSelectedPaymentMethod('GCash')} />
        <Button title="Debit/Credit" onPress={() => setSelectedPaymentMethod('card')} />
        <Button title="PayPal" onPress={() => setSelectedPaymentMethod('Paypal')} />
      </View>

      {/* GCash Section */}
      {selectedPaymentMethod === 'GCash' && (
        <View style={styles.section}>
          <Text>Enter your mobile number:</Text>
          <TextInput
            placeholder="Mobile Number"
            value={paymentInfo.gcash.phone}
            onChangeText={(text) => setPaymentInfo({ ...paymentInfo, gcash: { phone: text } })}
          />
        </View>
      )}

      {/* Debit/Credit Section */}
      {selectedPaymentMethod === 'card' && (
        <View style={styles.section}>
          <Text>Enter your card details:</Text>
          <TextInput
            placeholder="16-digit Card Number"
            value={paymentInfo.card.number}
            onChangeText={(text) => setPaymentInfo({ ...paymentInfo, card: { ...paymentInfo.card, number: text } })}
          />

          <TextInput
            placeholder="Name on Card"
            value={paymentInfo.card.name}
            onChangeText={(text) => setPaymentInfo({ ...paymentInfo, card: { ...paymentInfo.card, name: text } })}
          />

          <View style={styles.inlineInputs}>
            <TextInput
              placeholder="Expiry Date (MM/YY)"
              value={paymentInfo.card.expiry}
              onChangeText={(text) => setPaymentInfo({ ...paymentInfo, card: { ...paymentInfo.card, expiry: text } })}
            />

            <TextInput
              placeholder="CVV"
              value={paymentInfo.card.cvv}
              onChangeText={(text) => setPaymentInfo({ ...paymentInfo, card: { ...paymentInfo.card, cvv: text } })}
            />
          </View>
          {/* Add more input fields for expiry, name, and CVV */}
        </View>
      )}

      {/* PayPal Section */}
      {selectedPaymentMethod === 'Paypal' && (
        <View style={styles.section}>
          <Text>Enter your PayPal email address:</Text>
          <TextInput
            placeholder="Email Address"
            value={paymentInfo.paypal.email}
            onChangeText={(text) => setPaymentInfo({ ...paymentInfo, paypal: { email: text } })}
          />
        </View>
      )}

      {/* Save and Go Back Buttons */}
      <View style={styles.buttons}>
        <Button title="Save" onPress={handleSave} />
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      marginTop:100
    },
    methodSelection: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 20,
    },
    section: {
      marginVertical: 20,
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
    },
    inlineInputs: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });

export default PaymentMethods;
