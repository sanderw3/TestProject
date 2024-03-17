import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import { db } from '../Database/Firebase';
import { onValue, ref } from "firebase/database";


const RenderEachStudentInClass = (users : any, className: string) =>{
    {try{
        return Object.keys(users[className]["students"]).map((student) => (
            <DataTable.Row key={student}>
                <DataTable.Cell style={{alignItems: "center", justifyContent: "center"}}>{student}</DataTable.Cell>
                <DataTable.Cell style={{paddingLeft: 50, paddingRight: 50, alignItems: "center", justifyContent: "center"}}>{className}</DataTable.Cell>
                <DataTable.Cell style={{alignItems: "center", justifyContent: "center"}}>{users[className]["students"][student]["grade"]}</DataTable.Cell>
            </DataTable.Row>
        ))
        }catch(err){
            return null;
        }
    }
}


export default function HomeScreen() {
    const [users, setUsers] = React.useState([]);

    useEffect(() => {
        const unsubscribe = onValue(ref(db), (snapshot) => {
          const data = snapshot.val();
          setUsers(data);
        });
        
        return () => unsubscribe();
      }, [db]);


  return (
    <View style={styles.container}>
      <ScrollView>
        <DataTable style={{width: "100%"}}>
            <DataTable.Header style={{backgroundColor: 'white'}}>
            <DataTable.Title style={styles.title} > Student </DataTable.Title>
            <DataTable.Title style={{paddingLeft: 50}} > class </DataTable.Title>
            <DataTable.Title style={{paddingLeft: 40}} > Grade </DataTable.Title>
            </DataTable.Header>

            {Object.keys(users).map((className, index) => (
                <React.Fragment key={index}>
                {RenderEachStudentInClass(users, className)}
                <DataTable.Row>
                    <DataTable.Cell> </DataTable.Cell>
                </DataTable.Row>
                </React.Fragment>
            ))}

        </DataTable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 30,
  },
  title: {
    paddingLeft: 20,
    // justifyContent: "center",
  }
});