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

  login: {color: 'blue', marginStart: 3},
  bottomView: {
    flexDirection: 'row',
  },
});
