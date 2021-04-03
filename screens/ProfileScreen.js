import React, { useContext } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableOpacityComponent} from 'react-native';
import * as firebase from 'firebase';

import {UserContext} from '../contexts/UserContext'

export default ProfileScreen = () => {

  const [user, setUser] = useContext(UserContext)

  logOut = async () => {
    try {
      await firebase.auth().signOut()
      return true
    } catch (error) {
      console.log('Error in profile screen in logOut:', error)
    }
    return false
  }

  signOut = async() => {

    const isLoggedOut = await logOut()
    if(isLoggedOut) {
      setUser(state => ({ ...state, isLoggedIn: false}))
    }
  }

    return (
      <View style={styles.container}>
        <Text>Hi {user.name}</Text>
        <TouchableOpacity style={{marginTop: 32}} onPress={signOut}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    )
}

const styles= StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})