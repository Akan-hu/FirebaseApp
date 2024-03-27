import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import {styles} from './styles';

const AppHeader = props => {
  const {onPress} = props;
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>My To Do List</Text>
        <Pressable onPress={onPress}>
          <Image
            source={require('../assets/dots.png')}
            style={styles.imageStyle}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default AppHeader;
