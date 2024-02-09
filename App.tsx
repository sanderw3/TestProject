import React, { useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as SecureStore from 'expo-secure-store'; // for local storage
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddScreen from './Screens/AddScreen';
import RemoveScreen from './Screens/RemoveScreen';
import { auth } from './Database/Firebase';
import SignUpScreen from './Screens/SignUpScreen';
import SignInScreen from './Screens/SignInScreen';


const tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



function Tabs(){
  return(
    <tab.Navigator initialRouteName='Add'>
      <tab.Screen name="Add" component={AddScreen} />
      <tab.Screen name="Remove" component={RemoveScreen} />
    </tab.Navigator>
  );
}


function AuthStack() {
  return (
    <Stack.Navigator initialRouteName='SignIn'>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}


export default function App() {
  const [loggedIn, setLoggedIn] = React.useState(auth.currentUser);

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged((user) => {
      setLoggedIn(user);
    });
    return subscriber;
  }, []);


  return (
    <NavigationContainer>
      {loggedIn ? <Tabs/> : <AuthStack/>}
    </NavigationContainer> 
  );
}

