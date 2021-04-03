import { StatusBar } from 'expo-status-bar';
import React, {useState, useContext} from 'react';
import { StyleSheet, Text, TouchableOpacity, TextInput, View } from 'react-native';

import * as firebase from 'firebase'
import config from '../config/firebase'

import {UserContext} from '../contexts/UserContext'

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export default LoginScreen = ({navigation}) => {

  const [_, setUser] = useContext(UserContext)

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [errorMessage, setErrorMessage] = useState()


  handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      var user = firebase.auth().currentUser
      if (user != null) {
        setUser({
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          isLoggedIn: true
        })
      }
    } catch (error) {
      console.log('Error in login screen in handleLogin:', error)
      setErrorMessage(error.message)
    }
  }
  
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome back to exClaim!</Text>
        <View style={styles.errorMessage}>
          {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        </View>
        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Email address</Text>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              onChangeText={email => setEmail(email.trim())}
              value={email}
            />
          </View>
          <View style={{marginTop:32}}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize='none'
              onChangeText={password => setPassword(password.trim())}
              value={password}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={{color: '#FFF', fontWeight: '500'}}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignSelf: 'center', marginTop: 32}} onPress={() => navigation.navigate('Register')}>
            <Text style={{color: 'grey', fontSize: 13}}>
              New to exClaim? <Text style={{fontWeight: '500', color: 'blue'}}>Sign up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  welcome: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center'
  },
  errorMessage: {
    height:80,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30
  },
  error: {
    color: 'red',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center'
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30
  },
  inputTitle: {
    color: 'grey',
    fontSize: 10,
    textTransform: 'uppercase'
  },
  input: {
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 45,
    fontSize: 16,
    color: 'black'
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: 'cyan',
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
