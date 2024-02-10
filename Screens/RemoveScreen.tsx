import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, TextInput} from 'react-native';
import { deleteUserData } from '../Database/Firebase';


async function handleButtonClick(classID: string, Name: string) {
  if (!classID) { return; }
    console.log("Deleting student: " + Name + " in class: " + classID);
    deleteUserData(classID, Name);
}


export default function RemoveScreen() {
  const [classID, setID] = React.useState("");
  const [Name, setName] = React.useState("");

  useEffect(() => {
    
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter classID"
        value={classID}
        onChangeText={setID}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter student name"
        value={Name}
        onChangeText={setName}
      />
      
      <Button
        onPress={() => handleButtonClick(classID, Name)}
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

