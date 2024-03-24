import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
const App = () => {
  const inputRef = useRef();

  const [name, setName] = useState(null);
  const [list, setList] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  // Get user document with an ID of ABC
  useEffect(() => {
    // getDatabase();
    getRealtimeData();
    console.log('called');
  }, []);
  // const getDatabase = async () => {
  //   try {
  //     const data = await firestore()
  //       .collection('testing')
  //       .doc('nEO8phaAdR1N6RPMhkAJ')
  //       .get();
  //     setResponse(true);
  //     setData(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getRealtimeData = async () => {
    try {
      const realData = await database()
        .ref('todo')
        .on('value', template => {
          setList(template?.val());
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = value => {
    setName(value);
  };
  const index = list?.length;
  const handleSubmit = async () => {
    try {
      const sendDataToFirebase = await database().ref(`todo/${index}`).set({
        value: name,
      });
      setName('');
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditPress = editName => {
    setName(editName);
    inputRef?.current?.focus();
    setIsFocus(true);
    setIsUpdate(true);
  };
  const handleUpdateSubmit = () => {
    try {
      setIsFocus(false);
      setIsUpdate(false);
      inputRef?.current?.blur();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={style.safeAreaView}>
      {/** to hide status bar in app */}
      {/* <StatusBar hidden={true} /> */}
      <Text style={style.title}>CRUD OPERATIONS WITH FIREBASE</Text>
      <View style={style.viewStyle}>
        <TextInput
          ref={inputRef}
          style={style.inputText(isFocus)}
          placeholder="Enter your full name"
          onChangeText={handleChange}
          value={name}
        />
        {isUpdate ? (
          <TouchableOpacity
            style={style.tch}
            onPress={() => handleUpdateSubmit()}>
            <Text style={style.textStyleTch}>Update Details</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={style.tch} onPress={() => handleSubmit()}>
            <Text style={style.textStyleTch}>Submit Details</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={style.cardContainer}>
        <Text style={style.todo}>To Do List ({index})</Text>
        <FlatList
          data={list}
          renderItem={item => {
            console.log('first', item?.index);
            return (
              <View style={style.card}>
                {item?.item?.value?.length < 25 ? (
                  <Text style={style.text}>Name : {item?.item?.value}</Text>
                ) : (
                  <Text style={style.text}>
                    Name : {item?.item?.value?.slice(0, 25)}...
                  </Text>
                )}

                <View style={style.tchEdit}>
                  <TouchableOpacity
                    onPress={() => handleEditPress(item?.item?.value)}>
                    <Text style={style.edit}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={style.delete}
                    onPress={() => setEditModal(true)}>
                    <Text style={style.deleteText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Modal visible={editModal} />
    </View>
  );
};
const {height, width} = Dimensions.get('screen');
const style = StyleSheet.create({
  tchEdit: {
    flexDirection: 'row',
  },
  edit: {
    color: 'blue',
  },
  deleteText: {
    color: 'red',
  },
  delete: {
    marginStart: 5,
  },
  todo: {
    color: 'black',
    marginTop: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 10,
  },
  dataView: {
    width: width - 30,
    marginTop: 10,
    borderRadius: 15,
    borderColor: '#003366',
    padding: 20,
    borderWidth: 1.5,
  },
  safeAreaView: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#003366',
    marginTop: 20,
    fontWeight: '800',
  },
  textStyleTch: {
    color: 'white',
    textAlign: 'center',
  },
  viewStyle: {
    marginHorizontal: 10,
  },
  tch: {
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
    backgroundColor: '#003366',
  },
  inputText: isFocus => ({
    marginTop: 20,
    width: width - 30,
    borderRadius: 15,
    borderColor: isFocus ? 'blue' : 'black',
    borderWidth: 1.5,
    paddingLeft: 20,
  }),
  cardContainer: {
    marginVertical: 20,
    flex: 1,
  },
  card: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#ECF0F1',
    width: width - 40,
    padding: 20,
    borderRadius: 30,
    margin: 5,
    borderWidth: 1,
    borderColor: 'grey',
  },
  text: {
    color: 'black',
  },
});
export default App;
