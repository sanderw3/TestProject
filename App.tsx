import React, { useState, useEffect, useContext } from 'react'
import { Button, Image, TouchableOpacity, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddScreen from './Screens/AddScreen';
import RemoveScreen from './Screens/RemoveScreen';
import { auth } from './Database/Firebase';
import SignUpScreen from './Screens/SignUpScreen';
import SignInScreen from './Screens/SignInScreen';
import ChartScreen from './Screens/ChartScreen';
import HomeScreen from './Screens/HomeScreen';
import { createContext } from 'vm';
import InitDatabase from './Database/Sqlite';


const tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
// const t = createContext();




const ScreenOptions = (picture: any) => ({
  tabBarIcon: ({size}) => (
    <Image 
    source={picture} 
    style={{width: size, height: size, tintColor: null}}  />
  ),
  headerRight: () => (
    <Button title="Logout" onPress={() => auth.signOut()} />
  ),
  headerLeft: () => (
    <TouchableOpacity onPress={() => console.log('pressed')}>
      <MaterialCommunityIcons style={{paddingLeft: 20}} name="home" size={24} color="black" />
    </TouchableOpacity>
  )
})


function Tabs(){
  const [darkmode, setdarkmode] = useState(false);

  return(
    <tab.Navigator initialRouteName='Data'
    screenOptions={{
      tabBarActiveTintColor: 'red',
      tabBarInactiveTintColor: 'gray',
    }}
    >
      <tab.Screen name="Data" component={HomeScreen} 
        options={ScreenOptions(require('./assets/vetle2.jpg'))} />
      <tab.Screen name="Charts" component={ChartScreen}
        options={ScreenOptions(require('./assets/vetle.png'))}  />
      <tab.Screen name="Add" component={AddScreen}
        options={ScreenOptions(require('./assets/vetle1.jpg'))} />
      <tab.Screen name="Remove" component={RemoveScreen} 
        options={ScreenOptions(require('./assets/vetle2.jpg'))} />
    </tab.Navigator>
  );
}


function Yeses () {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
      <Text>Yes</Text>
    </View>
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
    const [teset, setTeset] = useState(false);
    InitDatabase()
    .then(() => console.log("Database created"))
    .catch((error) => console.log(error.message));
  
  useEffect(() => {
    const subscriber = auth.onAuthStateChanged((user) => {
      setLoggedIn(user);
    });

    // setTeset(1);
    
    return subscriber;
  }, []);

  

  return (
    <NavigationContainer>
      {loggedIn ? (teset ? <Yeses/> : <Tabs/>) : <AuthStack/>}
    </NavigationContainer> 
  );
}

