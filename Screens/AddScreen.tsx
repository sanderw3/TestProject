import React from 'react';
import { StyleSheet, Button, Text, View, TextInput} from 'react-native';
import { writeUserData } from '../Database/Firebase';
import { StatusBar } from 'expo-status-bar';


function handleButtonClick(username: string, id: string) {
  writeUserData(username, id);
}


export default function AddScreen() { 
  const [ID, setID] = React.useState("");
  const [Username, setUsername] = React.useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Id"
        value={ID}
        onChangeText={setID}  
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={Username}
        onChangeText={setUsername}
      />
      <Button
        onPress={() => handleButtonClick(Username, ID)}
        title="Add User"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200
  }
});