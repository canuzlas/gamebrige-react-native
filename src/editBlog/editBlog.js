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
  SafeAreaView,
} from 'react-native';
import BackIcon from 'react-native-vector-icons/MaterialIcons';
import BlogSendIcon from 'react-native-vector-icons/FontAwesome';
import { useHookstate } from '@hookstate/core';
import user_global_stage from '../../hookStates/user_data_hs';
import myBlogs_page_global_state from '../../hookStates/myBlogs_page_hs';
import * as Axios from 'axios';
import { API_SITE } from '@env';

const Home = ({ navigation }) => {
  const blogwrite_page_local_state_from_user_global_state =
    useHookstate(user_global_stage);
  const myBlogs_page_local_state_from_myBlogs_hs = useHookstate(
    myBlogs_page_global_state,
  );
  const [blogText, setBlogText] = useState('');
  const [blogTitle, setBlogTitle] = useState('');
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    const getBlog = async () => {
      const result = await Axios.default.post(API_SITE + 'api/getoneblog', {
        _id: myBlogs_page_global_state.get(),
      });
      if (result.data.error == false) {
        setBlog(result.data.blog);
        // setBlogText(result.data.blog.blog_text)
        // setBlogTitle(result.data.blog.blog_title)
      } else {
        ToastAndroid.showWithGravityAndOffset(
          'Beklenmedik hata!',
          1000,
          1000,
          1000,
          1000,
        );
        navigation.navigate('Tab', { screen: 'MyBlogs' });
      }
    };
    getBlog();
  });
  const editBlog = async () => {
    if (blogText.length == 0 || blogTitle.length == 0) {
      if (blogText.length == 0 && blogTitle.length) {
        const result = await Axios.default.post(API_SITE + 'api/editblog', {
          text: blog.blog_text,
          title: blogTitle,
          _id: myBlogs_page_global_state.get(),
        });
        console.log(result.data.error);
        if (result.data.error == false) {
          ToastAndroid.showWithGravityAndOffset(
            'Bloğunuz güncellendi.',
            1000,
            1000,
            1000,
            1000,
          );
          navigation.navigate('Tab', { screen: 'MyBlogs' });
        } else {
          ToastAndroid.showWithGravityAndOffset(
            'Blog düzenlerken hata!.',
            1000,
            1000,
            1000,
            1000,
          );
        }
      } else if (blogTitle.length == 0 && blogText.length) {
        const result = await Axios.default.post(API_SITE + 'api/editblog', {
          text: blogText,
          title: blog.blog_title,
          _id: myBlogs_page_global_state.get(),
        });
        console.log(result.data.error);
        if (result.data.error == false) {
          ToastAndroid.showWithGravityAndOffset(
            'Bloğunuz güncellendi.',
            1000,
            1000,
            1000,
            1000,
          );
          navigation.navigate('Tab', { screen: 'MyBlogs' });
        } else {
          ToastAndroid.showWithGravityAndOffset(
            'Blog düzenlerken hata!.',
            1000,
            1000,
            1000,
            1000,
          );
        }
      } else {
        ToastAndroid.showWithGravityAndOffset(
          'Bloğunuzda düzenleme yapmadınız !',
          1000,
          1000,
          1000,
          1000,
        );
      }
    } else {
      const result = await Axios.default.post(API_SITE + 'api/editblog', {
        text: blogText,
        title: blogTitle,
        _id: myBlogs_page_global_state.get(),
      });
      console.log(result.data.error);
      if (result.data.error == false) {
        ToastAndroid.showWithGravityAndOffset(
          'Bloğunuz güncellendi.',
          1000,
          1000,
          1000,
          1000,
        );
        navigation.navigate('Tab', { screen: 'MyBlogs' });
      } else {
        ToastAndroid.showWithGravityAndOffset(
          'Blog düzenlerken hata!.',
          1000,
          1000,
          1000,
          1000,
        );
      }
    }
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
              <BackIcon name="arrow-back-ios" size={32} color={'#71C9CE'}></BackIcon>
            </TouchableOpacity>
            <Text style={{ fontSize: 20 }}>Bloğunu Düzenle</Text>
            <Image
              style={{ width: 80, height: 80, marginTop: 15 }}
              source={require('../../assets/bgremoved.png')}></Image>
          </View>
          <ScrollView style={styles.scroll_view}>
            <TextInput
              defaultValue={blog.blog_title}
              style={styles.titleInput}
              cursorColor={'white'}
              onChangeText={text => setBlogTitle(text)}
              placeholder={'Blog başlığı..'}
              multiline={true}
              maxLength={100}></TextInput>
            <TextInput
              defaultValue={blog.blog_text}
              style={styles.textInput}
              cursorColor={'white'}
              onChangeText={text => setBlogText(text)}
              placeholder={'Birşeyler yazmaya başla..'}
              multiline={true}></TextInput>
          </ScrollView>
          <View style={styles.sendButtonView}>
            <TouchableOpacity onPress={editBlog}>
              <BlogSendIcon
                style={{ alignSelf: 'center' }}
                name="send-o"
                size={25}
                color={'#E3FDFD'}></BlogSendIcon>
            </TouchableOpacity>
          </View>
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
            <BackIcon name="arrow-back-ios" size={32} color={'#71C9CE'}></BackIcon>
          </TouchableOpacity>
          <Text style={{ fontSize: 20 }}>Bloğunu Düzenle</Text>
          <Image
            style={{ width: 80, height: 80, marginTop: 15 }}
            source={require('../../assets/bgremoved.png')}></Image>
        </View>
        <ScrollView style={styles.scroll_view}>
          <TextInput
            defaultValue={blog.blog_title}
            style={styles.titleInput}
            cursorColor={'white'}
            onChangeText={text => setBlogTitle(text)}
            placeholder={'Blog başlığı..'}
            multiline={true}
            maxLength={100}></TextInput>
          <TextInput
            defaultValue={blog.blog_text}
            style={styles.textInput}
            cursorColor={'white'}
            onChangeText={text => setBlogText(text)}
            placeholder={'Birşeyler yazmaya başla..'}
            multiline={true}></TextInput>
        </ScrollView>
        <View style={styles.sendButtonView}>
          <TouchableOpacity onPress={editBlog}>
            <BlogSendIcon
              style={{ alignSelf: 'center' }}
              name="send-o"
              size={25}
              color={'#E3FDFD'}></BlogSendIcon>
          </TouchableOpacity>
        </View>
      </View>
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
  sendButtonView: {
    backgroundColor: '#71C9CE',
    elevation: 10,
    width: 50,
    height: 50,
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 35,
    right: 35,
    borderRadius: 100,
    justifyContent: 'center',
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
