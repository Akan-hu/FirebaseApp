const {StyleSheet} = require('react-native');

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#003366',
    width: '100%',
    height: 52,
    justifyContent: 'center',
  },
  headerText: {
    marginStart: 10,
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageStyle: {
    height: 30,
    width: 35,
  },
});
