import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'react-native';


export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Image 
            source={require('../assets/vetle.png')} 
            style={{width: 300, height: 300}}  />           
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
})