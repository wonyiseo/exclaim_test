import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';


import AdminScreen from '../screens/AdminScreen';
import ManagerScreen from '../screens/ManagerScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ClaimScreen from '../screens/ClaimScreen';

export default MainStack = () =>{
    const mainStack = createBottomTabNavigator()
    const tabBarOptions = {
        showLabel : false,
        style : {
            backgroundColor : 'black',
            paddingBottom : 12
        }

    }
    const screenOptions = (({route}) => ({
        tabBarIcon : ({focused}) => {
            let iconname = 'claim'
            switch(route.name) {
                case 'Claim': 
                    iconname = 'wpforms'
                    break 
                case 'Admin': 
                    iconname = 'admin-panel-settings'
                    break 
                case 'Manager': 
                    iconname = 'star'
                    break  
                case 'Profile': 
                    iconname = 'person'
                    break   
                default :
                    iconname = 'claim'                    
            }
            return <Ionicons name={iconname} size={20} color={focused ? 'white' : 'blue'}/>
        }
    })) 
    return (
        <mainStack.Navigator tabBarOptions={tabBarOptions} screenOptions={screenOptions}>
            <mainStack.Screen name='Claim' component={ClaimScreen} />
            <mainStack.Screen name='Admin' component={AdminScreen} />
            <mainStack.Screen name='Manager' component={ManagerScreen} />
            <mainStack.Screen name='Profile' component={ProfileScreen} />
        </mainStack.Navigator>
    )
}