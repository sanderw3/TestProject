import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';




export default function App() {
const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Button
        title="Go to AddScreen"
        // onPress={() => navigation.navigate('AddScreen' as any)} navigate somehow???
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

