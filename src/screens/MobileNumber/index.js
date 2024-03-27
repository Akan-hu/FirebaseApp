import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styels';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import auth from '@react-native-firebase/auth';
const MobileNumber = () => {
  const [showSendOtp, setShowSendOtp] = useState(true);
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpView, setOtpView] = useState(false);
  const [confrimData, setConfirmData] = useState('');
  const handlePress = async () => {
    try {
      const mobileNumberToSend = '+91' + mobileNumber;
      const response = await auth().signInWithPhoneNumber(mobileNumberToSend);
      setConfirmData(response);
      alert('OTP is sent please enter in below input field');
      setShowSendOtp(false);
      setOtpView(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handlVerifyOtp = () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.mainContainer}>
          <Text style={styles.text}>Continue with mobile number</Text>
          <TextInput
            placeholder="Enter Phone Number"
            style={styles.inputStyle}
            value={mobileNumber}
            onChangeText={val => setMobileNumber(val)}
          />
          {showSendOtp && (
            <TouchableOpacity style={styles.tch} onPress={() => handlePress()}>
              <Text style={styles.sendOtp}>Send OTP</Text>
            </TouchableOpacity>
          )}
          {otpView && (
            <View style={styles.otpView}>
              <Text style={styles.enterOTP}>
                Enter the Otp code sent to your mobile number {mobileNumber}
              </Text>
              <TextInput
                placeholder="Enter Otp"
                style={styles.inputStyle}
                keyboardType="number-pad"
                value={mobileNumber}
                onChangeText={val => setOtp(val)}
                maxLength={6}
              />
              <TouchableOpacity
                style={styles.tch}
                onPress={() => handlVerifyOtp()}>
                <Text style={styles.sendOtp}>Vefiy OTP</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default MobileNumber;
