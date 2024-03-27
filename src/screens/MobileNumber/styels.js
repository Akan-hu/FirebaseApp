const {StyleSheet, Dimensions} = require('react-native');
const {height, width} = Dimensions.get('screen');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputStyle: {
    borderColor: 'grey',
    borderWidth: 1,
    width: width - 20,
    borderRadius: 10,
    marginTop: 30,
    paddingLeft: 20,
  },
  mainContainer: {flex: 1, alignItems: 'center', marginTop: 130},
  text: {
    color: '#191919',
    fontSize: 20,
    fontWeight: '700',
  },
  tch: {
    backgroundColor: '#003366',
    width: '95%',
    marginTop: 20,
    padding: 13,
    borderRadius: 10,
  },
  sendOtp: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
  },
  otpView: {
    marginTop: 30,
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  enterOTP: {
    textAlign: 'center',
    fontWeight: '500',
    color: 'black',
    width: '90%',
  },
});
