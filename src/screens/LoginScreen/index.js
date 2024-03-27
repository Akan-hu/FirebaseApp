import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
const LoginPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emptyInput, setEmptyInput] = useState('');
  const [showPas, setShowPass] = useState(true);
  const handlePress = async () => {
    try {
      if (email.length !== 0 && password.length !== 0) {
        const isUserLogin = await auth().signInWithEmailAndPassword(
          email,
          password,
        );
        const isEmailVerified = isUserLogin?.user?.emailVerified;
        if (isEmailVerified) {
          navigation.navigate('HomeScreen');
        } else {
          alert('Please verify your email address to proceed');
        }
        console.log('is user login ', isEmailVerified);
      } else {
        alert('Please Enter email and password to proceed');
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
        <Text style={styles.headingText}>Login With Password</Text>
        <TextInput
          placeholder="Enter Your email address"
          style={styles.inputText}
          value={email}
          onChangeText={val => setEmail(val)}
        />
        <View style={styles.passwordView}>
          <TextInput
            placeholder="Enter Password"
            style={styles.inputText1}
            value={password}
            onChangeText={val => setPassword(val)}
            secureTextEntry={showPas}
          />
          <Pressable onPress={() => setShowPass(!showPas)}>
            {showPas ? (
              <Image
                source={require('../../assets/hide_password.png')}
                style={styles.imgStyle}
              />
            ) : (
              <Image
                source={require('../../assets/show_passwhord.png')}
                style={styles.imgStyle}
              />
            )}
          </Pressable>
        </View>

        {passwordError && <Text>{passwordError}</Text>}

        <View style={styles.buttonView}>
          <Button title="Login" onPress={() => handlePress()} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('SignUpPage')}>
          <Text style={styles.sign}>
            New user? SignUp Then Login to your account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MobileNumber')}>
          <Text style={styles.sign}>Login With Mobile Number</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginPage;
