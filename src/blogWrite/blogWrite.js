import React, {useEffect, useState} from 'react';
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
  SafeAreaView,
} from 'react-native';
import BackIcon from 'react-native-vector-icons/MaterialIcons';
import BlogSendIcon from 'react-native-vector-icons/FontAwesome';
import {useHookstate} from '@hookstate/core';
import user_global_stage from '../../hookStates/user_data_hs';
import * as Axios from 'axios';
import {API_SITE} from '@env';

const Home = ({navigation}) => {
  const blogwrite_page_local_state_from_user_global_state =
    useHookstate(user_global_stage);
  const [blogText, setBlogText] = useState('');
  const [blogTitle, setBlogTitle] = useState('');
 
  const sendBlog = async () => {
    //AsyncStorage.clear()
    if (blogText.length == 0 || blogTitle.length == 0) {
      ToastAndroid.showWithGravityAndOffset(
        'Başlık veya blog kısmı boş bırakılamaz.!',
        1000,
        1000,
        1000,
        1000,
      );
    } else {
      const result = await Axios.default.post(API_SITE + 'api/saveblog', {
        text: blogText,
        title:blogTitle,
        author:
          blogwrite_page_local_state_from_user_global_state.get().user._id,
      });
      console.log(result.data.error);
      if (result.data.error == false) {
        ToastAndroid.showWithGravityAndOffset(
          'Bloğunuz paylaşıldı.',
          1000,
          1000,
          1000,
          1000,
        );
        setBlogText('');
        setBlogTitle('');
        navigation.navigate('Tab', {screen: 'MyBlogs'});
      } else {
        ToastAndroid.showWithGravityAndOffset(
          'Blog paylaşılmadı!.',
          1000,
          1000,
          1000,
          1000,
        );
      }
    }
  };
  return (
    <SafeAreaView>
      <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#E3FDFD',
      }}>
      <View style={styles.head_view}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Tab', {screen: 'Profile'})}
          style={styles.head_profile_icon}>
          <BackIcon name="arrow-back-ios" size={32} color={'#71C9CE'}></BackIcon>
        </TouchableOpacity>
        <Image
          style={{width: 80, height: 80, marginTop: 15}}
          source={require('../../assets/bgremoved.png')}></Image>
      </View>
      <ScrollView style={styles.scroll_view}>
      <TextInput  
          value={blogTitle}
          style={styles.titleInput}
          cursorColor={'white'}
          onChangeText={text => setBlogTitle(text)}
          placeholder={'Blog başlığı..'}
          multiline={true}
          maxLength={100}></TextInput>
        <TextInput
          value={blogText}
          style={styles.textInput}
          cursorColor={'white'}
          onChangeText={text => setBlogText(text)}
          placeholder={'Birşeyler yazmaya başla..'}
          multiline={true}></TextInput>
      </ScrollView>
      <View style={styles.sendButtonView}>
        <TouchableOpacity onPress={sendBlog}>
          <BlogSendIcon
            style={{alignSelf: 'center'}}
            name="send-o"
            size={25}
            color={'#E3FDFD'}></BlogSendIcon>
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  scroll_view: {
    backgroundColor: '#A6E3E9',
    elevation: 20,
    width: '90%',
    height: '80%',
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 10,
  },
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
  },
  sendButtonView:{
    backgroundColor: '#71C9CE',
    elevation:10,
    width: 50,
    height: 50,
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 35,
    right: 35,
    borderRadius:100,
    justifyContent:"center"
  },
  titleInput: {
    color: 'black',
    paddingVertical: 15,
    paddingHorizontal: 20,
    maxHeight: '85%',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  textInput: {
    color: 'black',
    paddingVertical: 15,
    paddingHorizontal: 20,
    maxHeight: '85%',
  },
});
export default Home;
