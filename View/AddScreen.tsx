import React from 'react';
import { StyleSheet, Button, Text, View, TextInput} from 'react-native';
import { writeUserData, deleteUserData, readUserData } from '../Database/Firebase';
import { User } from '../Model/User';
import { StatusBar } from 'expo-status-bar';


function handleButtonClick(user: User){
    console.log("Adding user: " + user.name);
    writeUserData(user);
}


export default function AddScreen() { 
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [imageUrl, setImageUrl] = React.useState("");

    return (
        <View style={styles.container}>
    
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              placeholder="Enter Name"
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              placeholder="Enter Email"
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              placeholder="Enter Image URL"
              onChangeText={(text) => setImageUrl(text)}
            />
    
          <Button
            onPress={() => handleButtonClick(new User(name, email, imageUrl))}
            title="Add User"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <Text>Open up App.js to start working on your app!</Text>
          <StatusBar style="auto" />
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });