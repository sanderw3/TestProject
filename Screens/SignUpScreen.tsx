import React from 'react';
import { StyleSheet, Button, Text, View, TextInput, Image} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { auth } from "../Database/Firebase";
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';



function handleButtonClick(email: string, password: string) {
  createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    return false;
  })

  return true; 
}




export default function SignUpScreen({ navigation }) { 
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    return (
        <View style={styles.container}>

          <Image 
          source={require('../assets/vetle2.jpg')} 
          style={{width: 300, height: 300, tintColor: null}}  />     
                
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
            onPress={() => {
              if(!handleButtonClick(email, password))
                alert("Do better");
            }}
            title="Sign up"
            color="#841584"
          />
          <View style={{marginTop: 10}}>  
            <Button
              onPress={() => navigation.navigate("SignIn")}
              title="Sign in instead"
              color="#841584"
            />
          </View>
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