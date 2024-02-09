import React from 'react';
import { StyleSheet, Button, Text, View, TextInput} from 'react-native';
import { writeUserData } from '../Database/Firebase';
import { StatusBar } from 'expo-status-bar';
import { User } from '../Model/User';


function handleButtonClick(user: User) {
  if(user == null || user.missingParameters()) { return; }
  writeUserData(user);
}

function inputFields( state: any, setState: any, ph: string = "") {
  return (
    <TextInput
        style={styles.input}
        placeholder={ph}
        value={state}
        onChangeText={setState}  
      />
  )
}

export default function AddScreen() { 
  const [classID, setclassID] = React.useState("");
  const [fName, setfName] = React.useState("");
  const [lName, setlName] = React.useState("");
  const [DOB, setDOB] = React.useState("");
  const [className, setclassName] = React.useState("");
  const [score, setscore] = React.useState("");
  const [grade, setgrade] = React.useState("");

  return (
    <View style={styles.container}>
      {inputFields(classID, setclassID, "Enter Id")}
      {inputFields(fName, setfName, "Enter first name")}
      {inputFields(lName, setlName, "Enter last name")}
      {inputFields(DOB, setDOB, "Enter DOB")}
      {inputFields(className, setclassName, "Enter class name")}
      {inputFields(score, setscore, "Enter score")}
      {inputFields(grade, setgrade, "Enter grade")}

      <Button
        onPress={() => handleButtonClick(new User(classID, fName, lName, DOB, className, score, grade))}
        title="Add User"
        color="#841584"
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