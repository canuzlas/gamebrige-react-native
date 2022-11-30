import React, {useEffect, useState} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity,ScrollView,RefreshControl,ToastAndroid, SafeAreaView} from 'react-native';
import {useHookstate} from '@hookstate/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import user_global_stage from '../../hookStates/user_data_hs';
import ProfileIcon from 'react-native-vector-icons/Feather';
import BlogWriteIcon from 'react-native-vector-icons/FontAwesome';


const Home = ({navigation}) => {
  const home_page_local_state_from_user_global_state =
    useHookstate(user_global_stage);
  console.log(home_page_local_state_from_user_global_state.get());
  const [user, setUser] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    setUser(home_page_local_state_from_user_global_state.get());
  }, []);
  const deleteSession = () => {
    AsyncStorage.removeItem('User');
  };
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(()=>{setRefreshing(false); ToastAndroid.showWithGravityAndOffset(
      'Sayfa Yenilendi.',
      1000,
      1000,
      1000,
      1000,
    );},2000)
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
        <TouchableOpacity  onPress={()=>navigation.navigate("Profile")} style={styles.head_profile_icon}>
          <ProfileIcon name="user" size={32} color={'#71C9CE'}></ProfileIcon>
        </TouchableOpacity>
        <Image
          style={{width: 80, height: 80, marginTop: 15}}
          source={require('../../assets/bgremoved.png')}></Image>
        <TouchableOpacity onPress={()=>navigation.navigate("BlogWrite")} style={styles.head_blog_icon}>
          <BlogWriteIcon
            name="pencil-square-o"
            color={'#71C9CE'}
            size={32}></BlogWriteIcon>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.body} refreshControl={<RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />}>
      <View style={{backgroundColor:"#A6E3E9",width:"95%",height:100,alignSelf:"center",marginVertical:5,borderRadius:10}}></View>
      <View style={{backgroundColor:"#A6E3E9",width:"95%",height:100,alignSelf:"center",marginVertical:5,borderRadius:10}}></View>
      <View style={{backgroundColor:"#A6E3E9",width:"95%",height:100,alignSelf:"center",marginVertical:5,borderRadius:10}}></View>
      <View style={{backgroundColor:"#A6E3E9",width:"95%",height:100,alignSelf:"center",marginVertical:5,borderRadius:10}}></View>
      <View style={{backgroundColor:"#A6E3E9",width:"95%",height:100,alignSelf:"center",marginVertical:5,borderRadius:10}}></View>
      <View style={{backgroundColor:"#71C9CE",width:"95%",height:100,alignSelf:"center",marginVertical:5,borderRadius:10}}></View>
      </ScrollView>


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
  body:{
    backgroundColor: '#E3FDFD',
    width: '100%',
    flexDirection: 'column',
  }
});
export default Home;
