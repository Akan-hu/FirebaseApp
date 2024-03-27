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
import auth from '@react-native-firebase/auth';
import AppHeader from '../AppHeader';
import {useNavigation} from '@react-navigation/native';
const HomeScreen = () => {
  const inputRef = useRef();

  const [name, setName] = useState(null);
  const [list, setList] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [indexx, setIndexx] = useState(0);
  const [item, setItem] = useState('');

  const [logoutModal, setLogoutModal] = useState(false);
  const navigation = useNavigation();
  // Get user document with an ID of ABC
  useEffect(() => {
    getRealtimeData();
  }, []);

  const getRealtimeData = () => {
    try {
      const ref = database().ref('todo');
      ref.on('value', snapshot => {
        const data = snapshot.val();
        const transformedData = Object.entries(data).map(([key, value]) => ({
          id: key,
          value: value?.value,
        }));
        const filteredData = transformedData?.filter(
          item => item?.value !== undefined,
        );
        // console.log('transformed data', filteredData);
        setList(filteredData || {}); // Update the state with data or an empty array if data is null/undefined
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = value => {
    setName(value);
  };

  const handleSubmit = async () => {
    try {
      if (name.length > 3) {
        const ref = database().ref('todo');
        const snapshot = await ref.once('value');
        const data = snapshot.val();

        // Find the first available index
        let newIndex = 0;
        while (data && data[newIndex]) {
          newIndex++;
        }
        const sendDataToFirebase = await database()
          .ref(`todo/${newIndex}`)
          .set({
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
      getRealtimeData();
      setEditModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogoutPress = async () => {
    await auth().signOut();
    setLogoutModal(false);
    navigation?.navigate('LoginPage');
  };

  return (
    <View style={style.safeAreaView}>
      <AppHeader onPress={() => setLogoutModal(true)} />
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
        <Text style={style.todo}>To Do List ({list?.length})</Text>
        <FlatList
          data={list}
          renderItem={({item}) => {
            console.log('161 ', item);
            if (item?.value !== undefined) {
              return (
                <TouchableOpacity
                  style={style.card}
                  onLongPress={() => setEditModal(true)}>
                  {item?.value?.length < 25 ? (
                    <Text style={style.text}>Name : {item?.value}</Text>
                  ) : (
                    <Text style={style.text}>
                      Name : {item?.value?.slice(0, 25)}...
                    </Text>
                  )}

                  <View style={style.tchEdit}>
                    <TouchableOpacity
                      onPress={() => handleEditPress(item?.value, item?.id)}>
                      <Text style={style.edit}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={style.delete}
                      onPress={() => handleDeletePress(item?.value, item?.id)}>
                      <Text style={style.deleteText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            }
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
      <Modal transparent={true} visible={logoutModal}>
        <View style={style.logoutModal}>
          <Pressable
            style={style.logoutMainContainer}
            onPress={() => handleLogoutPress()}>
            <Text style={style.textLogut}>Logout</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};
const COLOR_WHITE_70_OPACITY = 'rgba(0,0,0,0.7)';
const {height, width} = Dimensions.get('screen');
const style = StyleSheet.create({
  logoutModal: {
    flex: 1,
    alignItems: 'flex-end',
  },
  textLogut: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  logoutMainContainer: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    backgroundColor: '#003366',
    borderColor: 'white',
    borderWidth: 3,
    marginTop: 50,
    borderRadius: 10,
    elevation: 50,
  },
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
export default HomeScreen;
