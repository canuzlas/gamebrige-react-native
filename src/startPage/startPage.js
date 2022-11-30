import React, {useEffect} from 'react';
import {Text, View, Image,Platform, SafeAreaView} from 'react-native';
import * as Axios from 'axios';
import {API_SITE,API_SITE_IOS} from '@env';
import { useHookstate } from '@hookstate/core';
import start_page_global_state from '../../hookStates/start_page_hs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import user_global_stage from '../../hookStates/user_data_hs';

const StartPage = ({navigation}) => {
  const start_page_local_state = useHookstate(start_page_global_state);
  const start_page_local_state_from_user_global_state = useHookstate(user_global_stage);
  useEffect(() => {
    
    const getJWT = async () => {
      let res;
      if (Platform.OS === 'ios') {
        res = await Axios.default.get(API_SITE_IOS+"api")
      } else {
        res = await Axios.default.get(API_SITE+"api")
      }

      //console.log(res.data.token)
      //console.log(state.get())
      start_page_local_state.set(res.data.token)
      const user = await AsyncStorage.getItem('User')
      if(user === null){
        setTimeout(() => {
          navigation.navigate('LandingPage')
      }, 1000);
      }else{
        start_page_local_state_from_user_global_state.set(
          {
            user: JSON.parse(user),
          }
        )
        setTimeout(() => {
          navigation.navigate('Tab')
      }, 1000);
      }
     
    };
    getJWT()

  }, []);
  return (
  <SafeAreaView>
      <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#E3FDFD'
      }}>
      <Image
        style={{width: 200, height: 200}}
        source={require('../../assets/bgremoved.png')}></Image>
    </View>
  </SafeAreaView>
  );
};
export default StartPage;
