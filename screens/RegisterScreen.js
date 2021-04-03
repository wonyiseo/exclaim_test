import { StatusBar } from 'expo-status-bar';
import React, {useState, useContext} from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import * as firebase from 'firebase'
import config from '../config/firebase'

import {UserContext} from '../contexts/UserContext'

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export default RegisterScreen = ({navigation}) => {

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [errorMessage, setErrorMessage] = useState()

  const [_, setUser] = useContext(UserContext)

  handleRegister = async () => {
    const user = {name, email, password}
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      const uid = firebase.auth().currentUser.uid

      setUser({ ...user, isLoggedIn: true, Uid: uid})
    } catch (error) {
      console.log('Error in register screen in handleRegister:', error)
      setErrorMessage(error.message)
    }
  }
  
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to exClaim!</Text>
        <View style={styles.errorMessage}>
          {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        </View>
        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Name</Text>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              onChangeText={name => setName(name.trim())}
              value={name}
            />
          </View>
          <View style={{marginTop:32}}>
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
            <TextInput style={styles.input}
              secureTextEntry
              autoCapitalize='none'
              onChangeText={password => setPassword(password.trim())}
              value={password}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={{color: '#FFF', fontWeight: '500'}}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignSelf: 'center', marginTop: 32}} onPress={() => navigation.navigate('Login')}> 
            <Text style={{color: 'grey', fontSize: 13}}>
              Already a member? <Text style={{fontWeight: '500', color: 'blue'}}>Log in</Text>
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

