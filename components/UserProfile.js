import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import ImagePicker from 'react-native-image-picker';

const UserProfile = ({ navigation, route }) => {
    
  const { user } = route.params;
  const [userImage, setUserImage] = useState(null);
  const [loading, setLoading] = useState(false);  
  const [email, setEmail] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  const pickImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (!response.didCancel && !response.error) {
        setUserImage(response.uri);
      }
    });
  };

  const updateUserImage = async (imageUri) => {
    try {
      const response = await fetch('http://your-api-endpoint/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'usera@g.com', // Replace with the actual email or ID
          image: imageUri,
          // ... other fields you want to update
        }),
      });
  
      const data = await response.json();
      console.log(data); // Handle the response from the server
  
    } catch (error) {
      console.error('Error updating image:', error);
    }
  };
  
  const retrieveProfileData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/get-profile?email=${user.email}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      // Assuming the response contains the expected data structure
      setEmail(data.email);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setMobile(data.mobile);
    } catch (error) {
      console.error('Error fetching profile data:', error.message);
      // Handle the error as needed
    }
  }

  const handleSave = () => {
    const userProfile = {
      email,
      firstName: firstname,
      lastName: lastname,
      mobile,
    };
  
    setLoading(true);
  
    fetch('http://localhost:3000/update-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userProfile),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
  
        // Show a success alert
        Alert.alert('Success', 'Profile saved successfully', [
          {
            text: 'OK',
            onPress: () => {
              // Perform any additional actions after successful save
              navigation.navigate('MainApp', { user: data.user });
            },
          },
        ]);
      })
      .catch((error) => {
        setLoading(false);
  
        console.error('Error saving profile:', error);
        Alert.alert('Error', 'Failed to save profile. Please try again.');
      });
  };

  const handleBack = () => {
    navigation.navigate('MainApp', {user})
  }

  useEffect(() => {
    retrieveProfileData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>User Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
        editable={false}
      />

      <Text style={styles.label}>First Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter First Name"
        value={firstname}
        onChangeText={setFirstName}
        multiline={true}
      />

      <Text style={styles.label}>Last Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Last Name"
        value={lastname}
        onChangeText={setLastName}
      />

    <Text style={styles.label}>Mobile:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Mobile"
        value={mobile}
        onChangeText={setMobile}
      />

<Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        editable={false}
      />

      <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={handleSave} style={styles.greenButton}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleBack} style={styles.secondaryButton}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={styles.spinnerText}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  greenButton: {
    backgroundColor: 'green',
    width: 200,
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  secondaryButton: {
    backgroundColor: 'green', // Change the background color as needed
    width: 200,
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row', // Arrange buttons horizontally
    justifyContent: 'space-between', // Space them apart
    width: '100%', // Take the full width
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default UserProfile;
