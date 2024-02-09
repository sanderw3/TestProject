import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, TextInput} from 'react-native';
import { deleteUserData } from '../Database/Firebase';


function handleButtonClick(id: string) {
  if (!id) { return; }
    console.log("Deleting user: " + id);
    deleteUserData(id);
}



export default function RemoveScreen() {
  const [ID, setID] = React.useState("");
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Id"
        onChangeText={(text) => setID(text)}
      />
      
      <Button
        onPress={() => handleButtonClick(ID)}
        title="Delete User"
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

