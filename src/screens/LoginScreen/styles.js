const {StyleSheet} = require('react-native');

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    marginHorizontal: 20,
  },
  inputText: {
    marginTop: 30,
    borderWidth: 1.5,
    borderColor: '#003366',
    paddingLeft: 15,
  },
  imgStyle: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  passwordView: {
    marginTop: 30,
    borderWidth: 1.5,
    borderColor: '#003366',
    paddingLeft: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingText: {
    textAlign: 'center',
    marginTop: 80,
    color: '#003366',
    fontSize: 20,
    fontWeight: '600',
  },
  buttonView: {
    marginTop: 30,
  },
  sign: {
    color: '#003366',
    marginTop: 10,
    textAlign: 'center',
    fontWeight: '500',
  },
});
