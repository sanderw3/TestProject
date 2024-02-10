import React, { useEffect } from 'react'
import { StyleSheet, Text, View,  ScrollView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { db } from '../Database/Firebase';
import { onValue, ref } from "firebase/database";
import { BarChart } from 'react-native-chart-kit';


type info = {
    classId: string,
    class : object
}


const ToBarData = (students: object) => {

    const returningData = {
        labels: ["A", "B", "C", "D", "E", "F"],
        datasets:[
            {
            data: [0,0,0,0,0,0]
            }
        ]
    }

    //For each student
    Object.keys(students).forEach((studentName) => {
        const grade = students[studentName]["grade"];
        switch(grade){
            case "A":
                returningData.datasets[0].data[0]++;
                break;
            case "B":
                returningData.datasets[0].data[1]++;
                break;
            case "C":
                returningData.datasets[0].data[2]++;
                break;
            case "D":
                returningData.datasets[0].data[3]++;
                break;
            case "E":
                returningData.datasets[0].data[4]++;
                break;
            case "F":
                returningData.datasets[0].data[5]++;
                break;
        }
    });

    return returningData;
}

const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 0.7,
    decimalPlaces: 2,
};


const GradeChart = (props: info) => {
    return (
      <View style={styles.chart}>
        <Text style={styles.text}> {props.class["className"]}</Text>
        <BarChart
        data={ToBarData(props.class["students"])}
        width={300}
        height={250}
        yAxisLabel=""
        yAxisSuffix=""
        // yAxisInterval={2}
        yLabelsOffset={20}
        chartConfig={chartConfig}
        
        />
      </View>
    );
  };


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
            <ScrollView  style={{width: "100%"}} contentContainerStyle={styles.scrollView}>
                {Object.keys(users).map((className) => (
                    <GradeChart class={users[className]} classId={className} />
                ))}
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
    scrollView: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 500
    },
    chart: {
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
    }
})