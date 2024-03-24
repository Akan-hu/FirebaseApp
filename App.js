import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import database from '@react-native-firebase/database';
const App = () => {
  const inputRef = useRef();

  const [name, setName] = useState(null);
  const [list, setList] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [indexx, setIndexx] = useState(0);
  const [item, setItem] = useState('');

  // Get user document with an ID of ABC
  useEffect(() => {
    getRealtimeData();
    console.log('called');
  }, []);
  // getting data from  firebase firestore
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
  const index = list?.length;
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
  console.log('list?.length', list?.length);
  const handleSubmit = async () => {
    try {
      if (name.length > 3) {
        const sendDataToFirebase = await database().ref(`todo/${index}`).set({
          value: name,
        });
        setName('');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditPress = (editName, index) => {
    setName(editName);
    inputRef?.current?.focus();
    setIsFocus(true);
    setIsUpdate(true);
    setSelectedIndex(index);
  };
  const handleUpdateSubmit = async () => {
    try {
      if (name.length > 3) {
        const response = await database()
          .ref(`todo/${selectedIndex}`)
          .update({value: name});
        console.log('first', response);
        console.log('Second', selectedIndex);
        setIsFocus(false);
        setIsUpdate(false);
        inputRef?.current?.blur();
        setName('');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeletePress = (item, index) => {
    setEditModal(true);
    setIndexx(index);
    setItem(item);
  };
  const handleYesClick = async () => {
    try {
      const response = await database().ref(`todo/${indexx}`).remove();
      const updatedList = list.filter((item, index) => index !== indexx);
      setList(updatedList);
      setEditModal(false);
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
        {name?.length < 3 && name?.length > 0 && (
          <Text style={style.error}>
            Input length must be at least 3 characters
          </Text>
        )}
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
            return (
              <TouchableOpacity
                style={style.card}
                onLongPress={() => setEditModal(true)}>
                {item?.item?.value?.length < 25 ? (
                  <Text style={style.text}>Name : {item?.item?.value}</Text>
                ) : (
                  <Text style={style.text}>
                    Name : {item?.item?.value?.slice(0, 25)}...
                  </Text>
                )}

                <View style={style.tchEdit}>
                  <TouchableOpacity
                    onPress={() =>
                      handleEditPress(item?.item?.value, item?.index)
                    }>
                    <Text style={style.edit}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={style.delete}
                    onPress={() =>
                      handleDeletePress(item?.item?.value, item?.index)
                    }>
                    <Text style={style.deleteText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Modal visible={editModal} transparent={true}>
        <View style={style.modalContainer}>
          <View style={style.modalContainer2}>
            <View style={style.main}>
              <Text style={style.deleteTitle}>Delete Details</Text>
              <Text style={style.subheading}>
                Are you sure you want to delete {item}?
              </Text>
              <View style={style.bottomBtn}>
                <Pressable style={style.yesBtn} onPress={handleYesClick}>
                  <Text style={style.yesText}>Yes</Text>
                </Pressable>
                <Pressable
                  style={style.noBtn}
                  onPress={() => setEditModal(false)}>
                  <Text style={style.yesText}>No</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const COLOR_WHITE_70_OPACITY = 'rgba(0,0,0,0.7)';
const {height, width} = Dimensions.get('screen');
const style = StyleSheet.create({
  tchEdit: {
    flexDirection: 'row',
  },
  yesText: {
    color: 'white',
    fontSize: 16,
  },
  yesBtn: {
    backgroundColor: 'green',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  noBtn: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 17,
    marginStart: 10,
  },
  bottomBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: 8,
    marginTop: 15,
  },
  subheading: {
    marginTop: 10,
  },
  deleteTitle: {
    color: 'black',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLOR_WHITE_70_OPACITY,
  },
  modalContainer2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    height: 'auto',
    padding: 27,
    width: width - 50,
    backgroundColor: 'white',
  },
  error: {
    color: 'red',
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
