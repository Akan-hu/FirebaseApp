import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
const SignUpPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emptyInput, setEmptyInput] = useState('');

  const handlePress = async () => {
    try {
      if (email.length !== 0 && password.length !== 0) {
        const loginUser = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        console.log('20 ', loginUser);
        await auth().currentUser.sendEmailVerification();
        await auth().signOut();
        alert(
          'Please verify your email id sent to your registered email address',
        );
        navigation.navigate('LoginPage');
      }
    } catch (error) {
      if (error.code === 'auth/weak-password') {
        console.log(error?.message?.slice(53, 95)); // This will log the specific error message
        // Now you can use error.message as needed, such as displaying it to the user
        setPasswordError();
      } else {
        // Handle other types of errors
        console.log(error.message); // Log the error message for other types of errors
      }
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.headingText}>Signup with us to continue</Text>
        <TextInput
          placeholder="Enter Your email address"
          style={styles.inputText}
          value={email}
          onChangeText={val => setEmail(val)}
        />
        <TextInput
          placeholder="Enter Password"
          style={styles.inputText}
          value={password}
          onChangeText={val => setPassword(val)}
          secureTextEntry={true}
        />
        {passwordError && <Text>{passwordError}</Text>}

        <View style={styles.buttonView}>
          <Button title="SignUp" onPress={() => handlePress()} />
        </View>
        <View style={styles.bottomView}>
          <Text>Already Account?</Text>
          <TouchableOpacity onPress={() => navigation?.navigate('LoginPage')}>
            <Text style={styles.login}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUpPage;
