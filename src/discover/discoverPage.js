import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ToastAndroid,
  TextInput,
  Platform,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { useHookstate } from '@hookstate/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import user_global_stage from '../../hookStates/user_data_hs';
import BackIcon from 'react-native-vector-icons/MaterialIcons';
import BlogWriteIcon from 'react-native-vector-icons/FontAwesome';
import SearchIcon from 'react-native-vector-icons/MaterialIcons';
import FollowIcon from 'react-native-vector-icons/SimpleLineIcons';
import * as Axios from 'axios';
import { API_SITE } from '@env';
require('../../gpOauth');

const Home = ({ navigation }) => {
  const home_page_local_state_from_user_global_state =
    useHookstate(user_global_stage);

  const [user, setUser] = useState([]);
  const [searchPersonName, setSearchPersonName] = useState('');
  const [foundPersons, setFoundPersons] = useState([]);

  useEffect(() => {
    return () => {
      setSearchPersonName('');
      setFoundPersons([])
    }
  }, []);

  const searchPerson = async (NAME) => {
    if (!NAME) {
      setFoundPersons([])
      return 0;
    } else {
      const result = await Axios.default.post(API_SITE + 'api/searchperson', {
        name: NAME,
      });
      if (result.data.error == false) {
        setFoundPersons(result.data.person);
      } else {
        ToastAndroid.showWithGravityAndOffset(
          'Beklenmedik hata!',
          1000,
          1000,
          1000,
          1000,
        );
      }
    }

  };

  const followPerson = async (PERSON) => {
    const result = await Axios.default.post(API_SITE + 'api/followperson', {
      _id: home_page_local_state_from_user_global_state.get().user._id,
      person_id: PERSON._id
    });
    if (result.data.error == false) {
      ToastAndroid.showWithGravityAndOffset(
        'Takip edildi',
        1000,
        1000,
        1000,
        1000,
      );
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'Zaten takip ediyorsun',
        1000,
        1000,
        1000,
        1000,
      );
    }
  };

  const renderPerson = ({ item, i }) => {
    return (
      <View style={{ paddingHorizontal: 10, borderRadius: 10, width: '90%', padding: 10, backgroundColor: "#71C9CE", marginVertical: 5, alignSelf: "center", elevation: 10, flexDirection: "row", justifyContent: "space-between" }} key={i}>
        <Image style={{ width: 35, height: 35, alignSelf: "center", borderRadius: 100 }} source={{ uri: item.photo }}></Image>
        <Text style={{ color: "white", padding: 10, maxWidth: '60%' }}>{item.name}</Text>
        <TouchableOpacity onPress={() => { followPerson(item) }} style={{ alignSelf: "center" }}><FollowIcon name="user-follow" size={25} color={"white"}></FollowIcon></TouchableOpacity>
      </View>
    );
  };
  return (
    Platform.OS === 'ios' ?
      <SafeAreaView>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#E3FDFD',
          }}>
          <View style={styles.head_view}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.head_profile_icon}>
              <BackIcon
                name="arrow-back-ios"
                size={32}
                color={'#71C9CE'}></BackIcon>
            </TouchableOpacity>
            <Image
              style={{ width: 80, height: 80, marginTop: 15 }}
              source={require('../../assets/bgremoved.png')}></Image>
            <TouchableOpacity
              onPress={() => navigation.navigate('BlogWrite')}
              style={styles.head_blog_icon}>
              <BlogWriteIcon
                name="pencil-square-o"
                color={'#71C9CE'}
                size={32}></BlogWriteIcon>
            </TouchableOpacity>
          </View>

          <View style={styles.searchView}>
            <TextInput
              onChangeText={text => { searchPerson(text); setSearchPersonName(text) }}
              cursorColor={'#E3FDFD'}
              style={styles.searchTextInput}></TextInput>
            <TouchableOpacity onPress={() => searchPerson(searchPersonName)} style={styles.searchIcon}>
              <SearchIcon
                name="person-search"
                color={'#71C9CE'}
                size={32}></SearchIcon>
            </TouchableOpacity>
          </View>

          <FlatList
            style={styles.flatList}
            data={foundPersons ? foundPersons : null}
            renderItem={renderPerson}
            //contentContainerStyle={{flexDirection: 'column-reverse'}}
            keyExtractor={(item, i) => i}></FlatList>
        </View>
      </SafeAreaView>
      :
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#E3FDFD',
        }}>
        <View style={styles.head_view}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.head_profile_icon}>
            <BackIcon
              name="arrow-back-ios"
              size={32}
              color={'#71C9CE'}></BackIcon>
          </TouchableOpacity>
          <Image
            style={{ width: 80, height: 80, marginTop: 15 }}
            source={require('../../assets/bgremoved.png')}></Image>
          <TouchableOpacity
            onPress={() => navigation.navigate('BlogWrite')}
            style={styles.head_blog_icon}>
            <BlogWriteIcon
              name="pencil-square-o"
              color={'#71C9CE'}
              size={32}></BlogWriteIcon>
          </TouchableOpacity>
        </View>

        <View style={styles.searchView}>
          <TextInput
            onChangeText={text => { searchPerson(text); setSearchPersonName(text) }}
            cursorColor={'#E3FDFD'}
            style={styles.searchTextInput}></TextInput>
          <TouchableOpacity onPress={() => searchPerson(searchPersonName)} style={styles.searchIcon}>
            <SearchIcon
              name="person-search"
              color={'#71C9CE'}
              size={32}></SearchIcon>
          </TouchableOpacity>
        </View>

        <FlatList
          style={styles.flatList}
          data={foundPersons ? foundPersons : null}
          renderItem={renderPerson}
          //contentContainerStyle={{flexDirection: 'column-reverse'}}
          keyExtractor={(item, i) => i}></FlatList>
      </View>
  );
};
const styles = StyleSheet.create({
  head_view: {
    backgroundColor: '#E3FDFD',
    width: '100%',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    borderBottomColor: 'gray',
    flexDirection: 'row',
  },
  head_profile_icon: {
    marginLeft: 13,
  },
  head_blog_icon: {
    marginRight: 13,
  },
  searchView: {
    alignSelf: 'center',
    marginTop: 20,
    marginLeft: 20,
    width: '75%',
    height: '10%',
    justifyContent: 'center',
  },
  searchTextInput: {
    width: '100%',
    width: '85%',
    backgroundColor: '#A6E3E9',
    borderRadius: 50,
    paddingLeft: 20,
    paddingRight: 20,
    color: 'gray',
  },
  searchIcon: {
    position: 'absolute',
    right: 0,
  },
  flatList: {},
});
export default Home;
