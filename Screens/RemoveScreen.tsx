import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, TextInput} from 'react-native';
import { deleteUserData } from '../Database/Firebase';


function handleButtonClick(id: string) {
    console.log("Deleting user: " + id);
    deleteUserData(id);
}



export default function RemoveScreen() {
  const [ID, setID] = React.useState("");
  
  return (
    <View style={styles.container}>


        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder="Enter Name"
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
});

