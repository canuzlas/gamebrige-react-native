import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, ToastAndroid, SafeAreaView, Platform } from 'react-native';
import { useHookstate } from '@hookstate/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import user_global_stage from '../../hookStates/user_data_hs';
import BackIcon from 'react-native-vector-icons/MaterialIcons';
import BlogWriteIcon from 'react-native-vector-icons/FontAwesome';
import {
  GoogleSignin
} from '@react-native-google-signin/google-signin';
require('../../gpOauth');

const Home = ({ navigation }) => {
  const home_page_local_state_from_user_global_state =
    useHookstate(user_global_stage);

  const [user, setUser] = useState([]);

  useEffect(() => {
    setUser(home_page_local_state_from_user_global_state.get());
  }, []);

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
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.head_profile_icon}>
            <BackIcon name="arrow-back-ios" size={32} color={'#71C9CE'}></BackIcon>
          </TouchableOpacity>
          <Image
            style={{ width: 80, height: 80, marginTop: 15 }}
            source={require('../../assets/bgremoved.png')}></Image>
          <TouchableOpacity onPress={() => navigation.navigate("BlogWrite")} style={styles.head_blog_icon}>
            <BlogWriteIcon
              name="pencil-square-o"
              color={'#71C9CE'}
              size={32}></BlogWriteIcon>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={async () => {
          await AsyncStorage.removeItem('User')
          home_page_local_state_from_user_global_state.set(null)
          await GoogleSignin.signOut();
          navigation.navigate('LandingPage')
        }}>
          <Text>Çıkış</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView> : 
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#E3FDFD',
      }}>
      <View style={styles.head_view}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.head_profile_icon}>
          <BackIcon name="arrow-back-ios" size={32} color={'#71C9CE'}></BackIcon>
        </TouchableOpacity>
        <Image
          style={{ width: 80, height: 80, marginTop: 15 }}
          source={require('../../assets/bgremoved.png')}></Image>
        <TouchableOpacity onPress={() => navigation.navigate("BlogWrite")} style={styles.head_blog_icon}>
          <BlogWriteIcon
            name="pencil-square-o"
            color={'#71C9CE'}
            size={32}></BlogWriteIcon>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={async () => {
        await AsyncStorage.removeItem('User')
        home_page_local_state_from_user_global_state.set(null)
        await GoogleSignin.signOut();
        navigation.navigate('LandingPage')
      }}>
        <Text>Çıkış</Text>
      </TouchableOpacity>

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
  body: {
    backgroundColor: '#E3FDFD',
    width: '100%',
    flexDirection: 'column',
  }
});
export default Home;
