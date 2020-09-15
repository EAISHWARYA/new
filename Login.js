import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView, Button,Alert } from 'react-native';
import db from "../config"
import firebase from "firebase"
import SantaAnim from '../santa'

export default class LoginScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            emailId: '',
            isModalVisible: "false",
            firstName: "",
            lastName: "",
            address: "",
            contact: "",
            regEmail: "",
            username:"",
            password:'',
            confirmPassword:''
        }
    }

    showModal = ()=>{
        return(
            <Modal animationType = "fade" transparent = {true} visible = {this.state.isModalVisible} >
                <View style = {styles.ModalContainer}>
                    <ScrollView style = {{width:"100%",}}>
                        <KeyboardAvoidingView style = {styles.KeyboardAvoidingView}>
                            <Text style = {styles.ModalTitle}>Registration Form</Text>

                            <TextInput style = {styles.TextInput} placeholder = {"First Name"} maxLength = {12} onChangeText = {(text)=>{
                                this.setState({
                                    firstName:text
                                })
                            }}></TextInput>

                            <TextInput style = {styles.TextInput} placeholder = {"Last Name"} maxLength = {12} onChangeText = {(text)=>{
                                this.setState({
                                    lastName:text
                                })
                            }}></TextInput>

                            <TextInput style = {styles.TextInput} placeholder = {"Adress"} maxLength = {30} onChangeText = {(text)=>{
                                this.setState({
                                    address:text
                                })
                            }}></TextInput>

                            <TextInput style = {styles.TextInput} placeholder = {"contact Number"} maxLength = {12} onChangeText = {(text)=>{
                                this.setState({
                                    contact:text
                                })
                            }}></TextInput>

                            <TextInput style = {styles.TextInput} placeholder = {"Display Name"} maxLength = {12} onChangeText = {(text)=>{
                                this.setState({
                                    username:text
                                })
                            }}></TextInput>

                            <TextInput style = {styles.TextInput} placeholder = {"Email"} maxLength = {25} onChangeText = {(text)=>{
                                this.setState({
                                    emailId:text
                                })
                            }}></TextInput>

                            <TextInput style = {styles.TextInput} placeholder = {"Password"}  onChangeText = {(text)=>{
                                this.setState({
                                    password:text
                                })
                            }}></TextInput>

                            <TextInput style = {styles.TextInput} placeholder = {"Confirm Password"} onChangeText = {(text)=>{
                                this.setState({
                                    confirmPassword:text
                                })
                            }}></TextInput>

                            <Button title = "Submit" style = {{backgroundColor: "green"}} 
                            onPress = {() => {this.userSignUp(this.state.emailId, this.state.password)}}></Button>

                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        )
    }
    
    userLogin = (emailId, password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId, password)
        .then(()=>{
          return Alert.alert("Successfully Login")
        })
        .catch((error)=> {
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage)
        })
      }
    
        
    userSignUp = (emailId, password,confirmPassword) =>{
        if(password !== confirmPassword){
            return Alert.alert("password doesn't match\nCheck your password.")
        }else{
          firebase.auth().createUserWithEmailAndPassword(emailId, password)
          .then(()=>{
            db.collection('users').add({
              first_name:this.state.firstName,
              last_name:this.state.lastName,
              contact:this.state.contact,
              email_id:this.state.emailId,
              address:this.state.address
            })
            return  Alert.alert(
                 'User Added Successfully',
                 '',
                 [
                   {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
                 ]
             );
          })
          .catch((error)=> {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
          });
        }
      }

    


      render(){
        return(
          <View style={styles.container}>
            <View style={{justifyContent: 'center',alignItems: 'center'}}>
    
            </View>
              {
                this.showModal()
              }
            <View style={{justifyContent:'center', alignItems:'center'}}>
             
              <Text style={styles.title}>Book Santa</Text>
            </View>
            <View>
                <TextInput
                style={styles.loginBox}
                placeholder="abc@example.com"
                keyboardType ='email-address'
                onChangeText={(text)=>{
                  this.setState({
                    emailId: text
                  })
                }}
              />
              <TextInput
              style={styles.loginBox}
              secureTextEntry = {true}
              placeholder="enter Password"
              onChangeText={(text)=>{
                this.setState({
                  password: text
                })
              }}
            />
            <TouchableOpacity
               style={[styles.button,{marginBottom:20, marginTop:20}]}
               onPress = {()=>{
                 this.userLogin(this.state.emailId, this.state.password)
               }}
               >
               <Text style={styles.buttonText}>Login</Text>
             </TouchableOpacity>
    
             <TouchableOpacity
               style={styles.button}
               onPress={()=>this.setState({ isModalVisible:true})}
               >
               <Text style={styles.buttonText}>SignUp</Text>
             </TouchableOpacity>
          </View>
        </View>
        )
      }
    }

var styles = StyleSheet.create({
    TextInput: {
        borderRadius: 5, borderwidth:3, width:200, height:50, marginTop: 50
    },

    ModalContainer: {
        alignItems:'center'
    },

    KeyboardAvoidingView: {
        alignItems:'center',
        borderWidth:10,
        borderRadius:10,
    }
})