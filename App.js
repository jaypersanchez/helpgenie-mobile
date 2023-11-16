
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AuthScreen from './components/AuthScreen';
import Card from './components/PostCard'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainApp from './components/MainApp';
import PostJobAd from './components/PostJobAd';
import SearchForJobs from './components/SearchForJobs';
import Messages from './components/Messages';
import Settings from './components/Settings';
import UserProfile from './components/UserProfile';
const UserContext = React.createContext();

const Stack = createStackNavigator();

const App = () => {

  const [user, setUser] = useState(null)
  /*const [user, setUser] = useState({
    id: 1,
    username: 'exampleUser',
    email: 'user@example.com',
    // Other user data you want to include
  });*/
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // Render the main app if the user is logged in
          <Stack.Screen name="MainApp" component={MainApp} />
        ) : (
          // Render the login/signup screen if the user is not logged in
          <Stack.Screen name="AuthScreen" component={AuthScreen} />
        )}
        <Stack.Screen name="PostJobAd" component={PostJobAd} />
        <Stack.Screen name="SearchForJobs" component={SearchForJobs} />
        <Stack.Screen name="Messages" component={Messages} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="MainApp" component={MainApp} />
        
      </Stack.Navigator>
    </NavigationContainer>
    </UserContext.Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContent: {
    flex: 1, // Takes the remaining space
    width: '100%', // Take full width
    paddingHorizontal: 16, // Padding on the sides
  },
});

export default App;
