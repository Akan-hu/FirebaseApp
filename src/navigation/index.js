import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../screens/Home';
import {firebase} from '@react-native-firebase/database';
import HomeScreen from '../screens/Home';
import SignUpPage from '../screens/SignupScreen';
import LoginPage from '../screens/LoginScreen';
import Auth from '@react-native-firebase/auth';
import MobileNumber from '../screens/MobileNumber';
const Stack = createStackNavigator();
const Navigation = () => {
  const [user, setUser] = useState(false);
  const [initializing, setInitializing] = useState(true);
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  if (initializing) {
    return null;
  }

  // useEffect(() => {
  //   Auth().onAuthStateChanged(user => {
  //     if (user !== null) {
  //       setUser(true);
  //     }
  //   });
  //   console.log('user ', user);
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            name="HomeScreen"
            // component={SignUpPage}
            component={HomeScreen}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="LoginPage"
            component={LoginPage}
            options={{headerShown: false, headerBackground: 'blue'}}
          />
        )}
        <Stack.Screen
          name="SignUpPage"
          component={SignUpPage}
          options={{headerShown: false, headerBackground: 'blue'}}
        />
        {/* <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{headerShown: false, headerBackground: 'blue'}}
        /> */}
        <Stack.Screen
          name="MobileNumber"
          component={MobileNumber}
          options={{headerShown: false, headerBackground: 'blue'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
