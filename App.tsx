import React, { useEffect} from 'react'
import { Button, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddScreen from './Screens/AddScreen';
import RemoveScreen from './Screens/RemoveScreen';
import { auth } from './Database/Firebase';
import SignUpScreen from './Screens/SignUpScreen';
import SignInScreen from './Screens/SignInScreen';
import HomeScreen from './Screens/HomeScreen';



const tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const ScreenOptions = (picture: any) => ({
  tabBarIcon: ({size}) => (
    <Image 
    source={picture} 
    style={{width: size, height: size, tintColor: null}}  />
  ),
  headerRight: () => (
    <Button title="Logout" onPress={() => auth.signOut()} />
  ),
})


function Tabs(){
  return(
    <tab.Navigator initialRouteName='Add'
    screenOptions={{
      tabBarActiveTintColor: 'red',
      tabBarInactiveTintColor: 'gray',
    }}
    >
      <tab.Screen name="Home" component={HomeScreen}
        options={ScreenOptions(require('./assets/vetle.png'))}  />
      <tab.Screen name="Add" component={AddScreen}
        options={ScreenOptions(require('./assets/vetle1.jpg'))} />
      <tab.Screen name="Remove" component={RemoveScreen} 
        options={ScreenOptions(require('./assets/vetle2.jpg'))} />
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

