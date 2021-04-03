import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {UserProvider} from './contexts/UserContext'

import AppStack from './stacks/AppStack';

export default App = () => {
  return (
    <NavigationContainer>
      <UserProvider>
        <AppStack />
      </UserProvider>
    </NavigationContainer>
  )
}