import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Register from '../screens/RegisterScreen';
import Login from '../screens/LoginScreen';

export default AuthStack = () =>{
    const authStack = createStackNavigator()
    return (
        <authStack.Navigator headerMode='none'>
            <authStack.Screen name='Login' component={Login}/>
            <authStack.Screen name='Register' component={Register}/>
        </authStack.Navigator>
    )
}