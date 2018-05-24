import React, { Component } from 'react';
import {
  AppRegistry,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import { SocialIcon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';
import 'firebase/firestore';



export default class RegisterForm extends Component {

  state={
    first:'',
    last:'',
    email:'',
    password:'',
    confPassword:'',
    loading: false,
  }

  alreadyHaveAnAccPressed = () => {
    this.props.navigation.navigate('Login');
  };

  registerPressed = () => {
    first = this.state.first,
    last = this.state.last,
    email = this.state.email
    firestore = firebase.firestore()
    settings = {timestampsInSnapshots: true};
    firestore.settings(settings)

    if (this.state.first == '' || this.state.last == '' ||
        this.state.email == '' || this.state.password == '' ||
        this.state.confPassword == ''){
      alert('Please fill out all fields! Please!')
    } else if (this.state.password != this.state.confPassword) {
      alert('Passwords dont match!')
    } else {
      this.setState({loading: true})
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(function(user){
        alert(user);
        console.log(user, user.user.uid);
        // user.sendEmailVerification();
        firestore.collection('users')
        .doc(`${user.user.uid}`)
        .set({
          ['info']: {
            name:first+' '+last,
            email:email
          }},
          { merge: true }
        )
      })
      .then(()=> {
        this.setState({loading: false})
        this.switchNavigators()
      }).catch(function(e){
        alert(e)
      })

    }
  }

  switchNavigators(){
    this.props.navigation.navigate("SignedIn")
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
          {this.state.loading ?
            <View style={styles.actInd}>
              <ActivityIndicator size='large' color='#f92222'/>
            </View>
            :
            <View style={styles.mainContainer}>
              <View style={styles.horizContainer}>
                <TextInput
                  style={styles.nameInput}
                  placeholder="First"
                  placeholderTextColor="#7f8c8d"
                  returnKeyType="next"
                  keyboardType='email-address'
                  autoCorrect={false}
                  onChangeText={(first) => this.setState({first})}
                  onSubmitEditing={() => this.lastNameInput.focus()}
                />
                <TextInput
                  style={styles.nameInput}
                  placeholder="Last"
                  placeholderTextColor="#7f8c8d"
                  autoCorrect={false}
                  returnKeyType="next"
                  onChangeText={(last) => this.setState({last})}
                  ref={(lastName) => this.lastNameInput = lastName}
                  onSubmitEditing={() => this.emailInput.focus()}
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#7f8c8d"
                returnKeyType="next"
                keyboardType='email-address'
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(email) => this.setState({email})}
                ref={(email) => this.emailInput = email}
                onSubmitEditing={() => this.passwordInput.focus()}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#7f8c8d"
                secureTextEntry
                returnKeyType="next"
                onChangeText={(password) => this.setState({password})}
                ref={(password) => this.passwordInput = password}
                onSubmitEditing={() => this.confirmPasswordInput.focus()}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#7f8c8d"
                secureTextEntry
                returnKeyType="done"
                onChangeText={(confPassword) => this.setState({confPassword})}
                ref={(confirm) => this.confirmPasswordInput = confirm}
              />
              <TouchableOpacity style={styles.loginContainer}
                onPress={this.registerPressed}>
                <Text style={styles.loginText}>
                  Register
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.alreadyHaveAnAccPressed}>
                <Text style={styles.fpText}>
                  Already Have an Account?
                </Text>
              </TouchableOpacity>
            </View>
          }
        {/* </TouchableWithoutFeedback> */}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal:30,
    alignSelf:'stretch',
    justifyContent:'center',

  },
  mainContainer:{
    paddingBottom:150,
    marginBottom:10

  },
  inputContainer:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'stretch'
  },
  nameInput:{
    flex:1,
    height:34,
    backgroundColor:'#34495e',
    marginBottom:20,
    color:'white', //input text color
    fontFamily:'Helvetica Neue',
    fontSize:14,
    fontWeight:"300",
    opacity:1,
    paddingHorizontal:10,
    // borderRadius:10,
    borderColor:'#ef4836',
    borderWidth:1,
    marginBottom:10,

  },
  input:{
    height:34,
    backgroundColor:'#34495e',
    marginBottom:20,
    color:'white', //input text color
    fontFamily:'Helvetica Neue',
    fontSize:14,
    fontWeight:"300",
    opacity:1,
    paddingHorizontal:10,
    // borderRadius:10,
    borderColor:'#ef4836',
    borderWidth:1,
    marginBottom:10,

  },
  loginContainer:{
    backgroundColor:'#ef4836',
    paddingVertical:10,
    paddingHorizontal:10,
    borderColor:'black',
    marginTop:10

  },
  loginText:{
    textAlign:'center',
    color:'white',
    fontWeight:'600',
  },
  fpText:{
    paddingVertical:10,
    paddingHorizontal:10,
    color:'white',
    fontWeight:'100',
    opacity:0.6,
    textAlign:'center'
  },

  fbText:{
    color:'white',
    fontWeight:'700',
  },
  optionsContainer:{
    // flex:1,
    flexDirection:'row',
    justifyContent:'center',
  },
  horizContainer:{
    // flex:1,

    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  actInd:{
    // flex:1,
    paddingBottom:'80%',
    justifyContent:'center',
    alignSelf:'center'
  }




})
