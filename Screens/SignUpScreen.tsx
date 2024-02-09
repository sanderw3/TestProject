import React from 'react';
import { StyleSheet, Button, Text, View, TextInput} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { auth } from "../Database/Firebase";
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import SignInScreen from './SignInScreen';



function handleButtonClick(email: string, password: string) {
  createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  })
  
}




export default function SignUpScreen({ navigation }) { 
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    return (
        <View style={styles.container}>

            
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              onChangeText={(text) => setEmail(text)}  
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              onChangeText={(text) => setPassword(text)}
            />

          <Button
            onPress={() => handleButtonClick(email, password)}
            title="Sign up"
            color="#841584"
          />
          <Button
            onPress={() => navigation.navigate("SignIn")}
            title="Sign in instead"
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