import React from 'react';
import SignUpScreen from './SignUpScreen';
import { StyleSheet, Button, Text, View, TextInput} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { auth } from "../Database/Firebase";
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';



function handleButtonClick(email: string, password: string) {
  signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
  }).catch((error) => {
    console.log(error.code, error.message);
  })
}



export default function SignInScreen({ navigation }) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    return (
        <View style={styles.container}>

            
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              value={email}
              onChangeText={setEmail}  
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              value={password}
              onChangeText={setPassword}
            />

          <Button
            onPress={() => handleButtonClick(email, password)}
            title="Sign in"
            color="#841584"
          />
          <Button
            onPress={() => navigation.navigate("SignUp")}
            title="Sign up instead"
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