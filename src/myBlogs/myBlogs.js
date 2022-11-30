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
  Modal,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {useHookstate} from '@hookstate/core';
import user_global_stage from '../../hookStates/user_data_hs';
import myBlogs_page_global_state from '../../hookStates/myBlogs_page_hs';
import ProfileIcon from 'react-native-vector-icons/Feather';
import BlogWriteIcon from 'react-native-vector-icons/FontAwesome';
import ReadBlog from 'react-native-vector-icons/SimpleLineIcons';
import BlogSettingsIcon from 'react-native-vector-icons/AntDesign';
import CancelIcon from 'react-native-vector-icons/MaterialIcons';
import * as Axios from 'axios';
import {API_SITE} from '@env';

const Home = ({navigation}) => {
  const myBlogs_page_local_state_from_user_global_state =
    useHookstate(user_global_stage);
  const myBlogs_page_local_state_from_myBlogs_hs = useHookstate(myBlogs_page_global_state)
  const [refreshing, setRefreshing] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [readModalVisible, setReadModalVisible] = useState(false);
  const [readBlog, setReadBlog] = useState([]);
  const [blogId,setBlogId] = useState("")

  useEffect(() => {
    console.log('blogs');
    const getBlogs = async () => {
      const result = await Axios.default.post(API_SITE + 'api/getmyblogs', {
        _id: myBlogs_page_local_state_from_user_global_state.get().user._id,
      });
      setBlogs(result.data.blogs);
    };
    getBlogs();
  }, []);

  const renderBlogs = ({item, i}) => {
    return (
      <View
        key={i}
        style={{
          backgroundColor: '#A6E3E9',
          width: '95%',
          height: 100,
          alignSelf: 'center',
          marginVertical: 5,
          borderRadius: 10,
          elevation:10
        }}>
        <Text numberOfLines={1} style={styles.blog_title}>
          {item.blog_title}
        </Text>
        <Text numberOfLines={1} style={styles.blog_text}>
          {item.blog_text}
        </Text>
        <View style={styles.blogSettingsView}>
        <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
              setBlogId(item._id)
            }}>
            <BlogSettingsIcon
              name="setting"
              size={25}
              color={'gray'}></BlogSettingsIcon>
        </TouchableOpacity>
          <TouchableOpacity
            style={{marginTop:10}}
            onPress={async() => {
              setReadBlog({title:item.blog_title,text:item.blog_text})
              setReadModalVisible(true);
            }}>
            <ReadBlog
              name="eye"
              size={25}
              color={'gray'}></ReadBlog>
          </TouchableOpacity>

        </View>
      </View>
    );
  };
  const onRefresh = async (fromwhere) => {
    setRefreshing(true);
    const result = await Axios.default.post(API_SITE + 'api/getmyblogs', {
      _id: myBlogs_page_local_state_from_user_global_state.get().user._id,
    });
    if(fromwhere !== "delete"){
      ToastAndroid.showWithGravityAndOffset(
        'Sayfa Yenilendi.',
        1000,
        1000,
        1000,
        1000,
      );
    }
    setBlogs(result.data.blogs);
    setRefreshing(false);
  };
  const deleteBlog = async () =>{
    const result = await Axios.default.post(API_SITE+"api/deleteblog",{_id:blogId})
    if(result.data.error == false){
      ToastAndroid.showWithGravityAndOffset(
        'Blog silindi.',
        1000,
        1000,
        1000,
        1000,
      );
      setModalVisible(false)
      onRefresh("delete")
      setBlogId("")
    }else{
      ToastAndroid.showWithGravityAndOffset(
        'Blog silinirken hata.',
        1000,
        1000,
        1000,
        1000,
      );
    }
    
  }
  const editBlog = async () =>{
    myBlogs_page_local_state_from_myBlogs_hs.set({_id:blogId})
    setModalVisible(false)
    setBlogId(false)
    navigation.navigate("EditBlog")
  }
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
          onPress={() => navigation.navigate('Profile')}
          style={styles.head_profile_icon}>
          <ProfileIcon name="user" size={32} color={'#71C9CE'}></ProfileIcon>
        </TouchableOpacity>
        <Image
          style={{width: 80, height: 80, marginTop: 15}}
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
      <FlatList
        style={styles.body}
        data={blogs}
        renderItem={renderBlogs}
        contentContainerStyle={{flexDirection: 'column-reverse'}}
        keyExtractor={(item, i) => i}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }></FlatList>
       {/* settings modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          setBlogId("")
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '50%',
              height: '35%',
              backgroundColor: '#71C9CE',
              borderRadius: 10,
              elevation: 15,
            }}>
            <TouchableOpacity
              onPress={() => {setModalVisible(!modalVisible);setBlogId("")}}
              style={{position: 'absolute', right: 10, top: 10}}>
              <CancelIcon
                name="cancel-presentation"
                size={25}
                color={'#E3FDFD'}></CancelIcon>
            </TouchableOpacity>

            <View
              style={{
                marginTop: 80,
                width: '90%',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                 onPress={()=>editBlog()}
                style={{
                  backgroundColor: '#A6E3E9',
                  width: '90%',
                  padding: 15,
                  alignItems: 'center',
                  alignSelf: 'center',
                  borderRadius: 7,
                }}>
                <Text>Düzenle</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginTop: 10,
                width: '90%',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <TouchableOpacity
              onPress={()=>deleteBlog()}
                style={{
                  backgroundColor: '#A6E3E9',
                  width: '90%',
                  padding: 15,
                  alignItems: 'center',
                  alignSelf: 'center',
                  borderRadius: 7,
                }}>
                <Text>Bloğu sil</Text>
              </TouchableOpacity>
            </View>
            <View></View>
            <View></View>
          </View>
        </View>
      </Modal>
        {/* read modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={readModalVisible}
        onRequestClose={() => {
          setReadModalVisible(!readModalVisible);
          setReadBlog([])
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '85%',
              height: '80%',
              backgroundColor: '#71C9CE',
              borderRadius: 10,
              elevation: 15,
            }}>
            <TouchableOpacity
              onPress={() => {  setReadModalVisible(!readModalVisible);
                setReadBlog([])}}
              style={{position: 'absolute', right: 10, top: 10}}>
              <CancelIcon
                name="cancel-presentation"
                size={25}
                color={'#E3FDFD'}></CancelIcon>
            </TouchableOpacity>
            <Text style={{marginTop:50,padding:15,fontSize:18}}>{readBlog.title}</Text>
            <View style={{borderBottomColor:"white",borderBottomWidth:1}}></View>
            <ScrollView style={{maxHeight:'65%',marginTop:10,}}>
            <Text style={{padding:15}}>{readBlog.text}</Text>
            </ScrollView>
            
          </View>
        </View>
      </Modal>
    </View>
   </SafeAreaView>
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
  },
  blogSettingsView: {
    flexDirection:"column",
    position: 'absolute',
    top: 5,
    right: 5,
  },
  blog_title: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 20,
    maxWidth: '80%',
  },
  blog_text: {
    marginLeft: 10,
    marginTop: 5,
    maxWidth: '80%',
  },
});
export default Home;
