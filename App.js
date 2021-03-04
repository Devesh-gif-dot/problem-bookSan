import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer,createSwitcthNavigator} from 'react-navigation';
import LoginScreen from './screen/LoginScreen';


export default function App(){
  return (
    <View style={styles.container}>
    <LoginScreen />
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
