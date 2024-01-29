import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, TouchableOpacity } from 'react-native';
import { writeUserData } from './Database/Firebase';


function handleScreenTouch() {
  writeUserData("2", "John doe", "a@a.com", "https://i.pravatar.cc/300");
}

function handleButtonClick() {
  writeUserData("1", "John doe", "a@a.com", "https://i.pravatar.cc/300");
}



export default function App() {
  return (
    <View style={styles.container}>
      <Button
        onPress={onPressLearnMore}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <TouchableOpacity onPress={handleScreenTouch}>
        <Text>Touch Here</Text>
      </TouchableOpacity>
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

