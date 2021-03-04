import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity, Alert,KeyboardAvoidingView,Modal, ScrollView } from 'react-native';
import {createAppContainer,createSwitcthNavigator} from 'react-navigation';
import * as firebase from 'firebase';
import db from '../config'

export default class LoginScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      name:'',
      address:'',
      contact:'',
      confirmPassword:'',
      isModalVisible:false
    }
  }

  SignIN = async(email,password)=>{
  if(email,password){
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(()=>{
      return Alert.alert("Successfully Logged in")
    }).catch((error)=>{
      return Alert.alert(error.code)
    })
  }else {
    Alert.alert("Enter email and Password");
  }
  }

  SignUp = async(email,password,confirmPassword)=>{
    if(email,password,confirmPassword){
      if(password != confirmPassword){
        Alert.alert("Passwords don't match")
      }else{
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(()=>{
          db.collection('users').add({
            name:this.state.name,
            contact:this.state.contact,
            email:this.state.email,
            address:this.state.address
          })
          return Alert.alert("User added succesfully","",[{text:'OK',onPress:()=>this.setState({isModalVisible:false})}])
        }).catch((error)=>{
          return Alert.alert(error.code)
        })
      }
    }else{
      Alert.alert("Enter email,password,confirm password");
    }
  }
  ShowModal = ()=>{
    return(
    <Modal animationType='fade'
    transparent={true}
    visible={this.state.isModalVisible}>
    <View>
      <ScrollView>
      <KeyboardAvoidingView>
        <Text>Registration</Text>
        
        <TextInput style={styles.input} 
        onChangeText={(text)=>{this.setState({email:text})}}
        placeholder={"Email"}
        keyboardType={'email-address'}/>

        <TextInput style={styles.input} 
        onChangeText={(text)=>{this.setState({password:text})}}
        placeholder={"Password"}
        multiline={false}
        secureTextEntry={true}/>

      <TextInput style={styles.input} 
        onChangeText={(text)=>{this.setState({confirmPassword:text})}}
        placeholder={"Confirm Password"}
        multiline={false}
        secureTextEntry={true}/>

        <TextInput style={styles.input} 
        onChangeText={(text)=>{this.setState({name:text})}}
        placeholder={"Name"}/>
        
        <TextInput style={styles.input} 
        onChangeText={(text)=>{this.setState({contact:text})}}
        placeholder={"Contact"}
        keyboardType={'numeric'}
        maxLength={10}/>
        
        <TextInput style={styles.input} 
        onChangeText={(text)=>{this.setState({address:text})}}
        placeholder={"Address"}
        multiline={true}/>
        <TouchableOpacity style={styles.button} onPress={()=>{
          this.SignUp(this.state.email,this.state.password,this.state.confirmPassword)
        }}><Text>Sign UP</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.button,{marginTop:15}]}
        onPress={this.setState({isModalVisible:false})}><Text>Cancel</Text></TouchableOpacity>
      </KeyboardAvoidingView>
      </ScrollView>
    </View>
    </Modal>
    ) 
  }

  render(){
  return (
    <View>
    {this.ShowModal()}
    <KeyboardAvoidingView behavior={'padding'} enabled>
    <View style={styles.container}>
    <TextInput
    style={styles.input}
    placeholder={"Enter Email Here"}
    onChangeText={(text)=>{this.setState({email:text})}}   
    value={this.state.email}
    />
    <TextInput 
    style={styles.input}  
    placeholder={"Enter Password Here"}
    onChangeText={(text)=>{this.setState({password:text})}}   
    value={this.state.password}
    />
    <TouchableOpacity style={styles.button} 
    onPress={()=>{this.SignIN(this.state.email,this.state.password)}}><Text>Sign IN</Text></TouchableOpacity>
    <TouchableOpacity style={[styles.button,{marginTop:20}]}
    onPress={()=>{
      this.setState({isModalVisible:true})
    }}><Text>Sign UP</Text></TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    backgroundColor:'red',
    width:70,
    alignItems:'center',
    justifyContent:'center'
  },
  input:{
    width:100,
    height:30,
    color:'black',
    marginBottom:10,
    borderWidth:1,
    borderColor:'black'
  }
});