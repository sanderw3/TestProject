import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, TextInput} from 'react-native';
import { writeUserData, deleteUserData, readUserData } from '../Database/Firebase';
import { User } from '../Model/User';


function handleButtonClick(id: number) {
    console.log("Deleting user: " + id);
    deleteUserData(id);
}



export default function App() {
  const [ID, setID] = React.useState(0);
  
  return (
    <View style={styles.container}>


        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder="Enter Name"
          onChangeText={(text) => setID(Number(text))}
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

