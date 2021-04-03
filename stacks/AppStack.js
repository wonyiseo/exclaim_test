import React, { useContext } from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import * as firebase from 'firebase'
import config from '../config/firebase'

import {UserContext} from '../contexts/UserContext'

if(!firebase.apps.length) {
    firebase.initializeConfig(config)
}

import AuthStack from './AuthStack';
import MainStack from './MainStack';

export default AppStack = () => {
    const appStack = createStackNavigator()
    const [user] = useContext(UserContext)

    return (
        <appStack.Navigator headerMode='none'>
            {user.isLoggedIn ? (
                <appStack.Screen name='Main' component={MainStack}/>
            ) : (
                <appStack.Screen name='Auth' component={AuthStack}/>
            )
        } 
        </appStack.Navigator>
    )
}