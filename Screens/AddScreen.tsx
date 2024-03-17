import React, { useEffect } from 'react';
import { StyleSheet, Button, View, TextInput, ScrollView} from 'react-native';
import { writeUserData} from '../Database/Firebase';
import { StatusBar } from 'expo-status-bar';
import { User } from '../Model/User';
import { sendEmailVerification } from 'firebase/auth';
import InitDatabase from '../Database/Sqlite';
import * as SQLite from 'expo-sqlite';


const classEnum = {
  "MGMT329" : "Database",
  "MGMT450" : "Computer Based IS",
}

// type inputfield = {
//   state: string,
//   // setState: React.Dispatch<React.SetStateAction<string>>,
//   // ph: string
// }

// const inField = (props: inputfield ) => {
//   return (
//     <View>
//     <TextInput
//         style={styles.input}
//         // placeholder={props.ph}
//         value={props.state}
//         // onChangeText={props.setState}  
//       />
//     </View>
//   )
// }


function classidBYname(classStore: any, name: string) {
  for (let [key, val] of Object.entries(classStore)) {
    if (val === name) {
      return key;
    }
  }
  return null;
}

async function handleButtonClick(user: User) {
  // if(user == null || user.missingParameters()) { return false; }
  // writeUserData(user);

  // this opens (or creates) the database
  const db = SQLite.openDatabase('app.db');
  
  // decides whether access to writing or reading is granted
  const readOnly = false;

  // regular SQL statements
  db.transactionAsync(async tx => {
    const result = await tx.executeSqlAsync('SELECT * FROM Contents', []);
    console.log('Count:', result.rows[0]);
  }, readOnly);


  // const readOnly = false;
  // await db.transactionAsync(async tx => {
  //   // await tx.executeSqlAsync('CREATE TABLE IF NOT EXISTS Contents (id INTEGER PRIMARY KEY AUTOINCREMENT, classID TEXT, fName TEXT, lName TEXT, DOB TEXT, className TEXT, score TEXT, grade TEXT)');
  //   const result = await tx.executeSqlAsync('SELECT COUNT(*) FROM Contents', []);
  //   console.log('Count:', result.rows[0]['COUNT(*)']);  },
  //   readOnly)

  // .catch((error) => {
  //   console.log(error);
  // });

  

  return true;
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
      <ScrollView style={{width: "100%"}} contentContainerStyle={styles.ScrollView}>
        
      {inputFields(classID, 
        (val: string) => {
          setclassID(val);
          if (val in classEnum) 
            setclassName(classEnum[val])
        } , "Enter Id")}

      {inputFields(className, 
        (val: string) => {
          setclassName(val);
          let key = classidBYname(classEnum, val);
          if (key)
            setclassID(key)
        }, "Enter class name")}
      
      {inputFields(fName, setfName, "Enter first name")}
      {inputFields(lName, setlName, "Enter last name")}
      {inputFields(DOB, setDOB, "Enter DOB")}


      <TextInput
      style={styles.input }
        keyboardType='numeric'  
        placeholder={"Enter score"}
        value={score}
        onChangeText={(val: string) => {
          setscore(val);
          const scor = parseInt(val);
          if (scor >= 0 && scor <= 39)
            setgrade("F")
          else if (scor >= 40 && scor <= 59)
            setgrade("D")
          else if (scor >= 60 && scor <= 79)
            setgrade("C")
          else if (scor >= 80 && scor <= 89)
            setgrade("B")
          else if (scor >= 90 && scor <= 100)
            setgrade("A")
        }}  
      />

      {/* {inputFields(score, 
        (val: string) => {
          setscore(val);
          const scor = parseInt(val);
          if (scor >= 0 && scor <= 39)
            setgrade("F")
          else if (scor >= 40 && scor <= 59)
            setgrade("D")
          else if (scor >= 60 && scor <= 79)
            setgrade("C")
          else if (scor >= 80 && scor <= 89)
            setgrade("B")
          else if (scor >= 90 && scor <= 100)
            setgrade("A")
        }, "Enter score")} */}


      {inputFields(grade, setgrade, "Enter grade")}

      <Button
        onPress={async () => {
          if (! await handleButtonClick(new User(classID, fName, lName, DOB, className, score, grade)))
            alert("All fields must be filled");
          else if (parseInt(score) < 0 || parseInt(score) > 100)
            alert("Score must be between 0 and 100");
          else {
            alert("User added successfully");
            setclassID("");
            setfName("");
            setlName("");
            setDOB("");
            setclassName("");
            setscore("");
            setgrade("");
            }
          }
        }
        title="Add User"
        color="#841584"
      />
      <StatusBar style="auto" />
      </ScrollView>
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
  },
  ScrollView: {
    flex: 1,
    width: "100%",
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 10
  }
});