import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, ToastAndroid,Platform, TouchableOpacity, SafeAreaView} from 'react-native';
import * as Axios from 'axios';
import {API_SITE,API_SITE_IOS} from '@env';
import {useHookstate} from '@hookstate/core';
import start_page_global_state from '../../hookStates/start_page_hs';
import user_global_stage from '../../hookStates/user_data_hs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { AppleButton,appleAuth } from '@invertase/react-native-apple-authentication';
require('../../gpOauth');

export default ExampleComponent = ({navigation}) => {
  const login_page_local_state_from_start_page = useHookstate(start_page_global_state);
  const login_page_local_state_from_user_global_state = useHookstate(user_global_stage);
   
  useEffect(() => {
    const loginApple = async ()=>{
      const resjwt = await Axios.default.post(API_SITE_IOS + 'api', {
        token: login_page_local_state_from_start_page.get(),
      });
  
      if (resjwt.data.error === 'false') {
        const result = await Axios.default.post(
          API_SITE_IOS + 'api/registerorlogin',
          {
            user: {email:"canuzlass@gmail.com"},
          },
        );
        console.log(result.data)
        if (result.data.login == 'true') {
          await AsyncStorage.setItem('User', JSON.stringify(result.data.user));
          login_page_local_state_from_user_global_state.set({
            user: result.data.user,
          });
          setTimeout(() => {
            navigation.navigate('Tab');
          }, 1000);
        } else {
          await AsyncStorage.setItem('User', JSON.stringify(result.data.user));
          login_page_local_state_from_user_global_state.set({
            user: result.data.user,
          });
          setTimeout(() => {
            navigation.navigate('Tab');
          }, 1000);
        }
      } else {
      return 0;
      }
    }
    loginApple()

    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    return appleAuth.onCredentialRevoked(async () => {
      console.warn('If this function executes, User Credentials have been Revoked');
    });
  }, []);

  //const [gpOauthUser, setgpOauthUser] = useState([]);
  signIn = async () => {
    try {
      //console.log(GOOGLE_CLIENT_ID)
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      //setgpOauthUser({userInfo});
      const resjwt = await Axios.default.post(API_SITE + 'api', {
        token: login_page_local_state_from_start_page.get(),
      });

      if (resjwt.data.error === 'false') {
        const result = await Axios.default.post(
          API_SITE + 'api/registerorlogin',
          {
            user: userInfo.user,
          },
        );

        if (result.data.login == 'true') {
          await AsyncStorage.setItem('User', JSON.stringify(result.data.user));
          login_page_local_state_from_user_global_state.set({
            user: result.data.user,
          });
          ToastAndroid.showWithGravityAndOffset(
            'Giriş İşlemi Başarılı.',
            1000,
            1000,
            1000,
            1000,
          );
          setTimeout(() => {
            navigation.navigate('Tab');
          }, 1000);
        } else {
          await AsyncStorage.setItem('User', JSON.stringify(result.data.user));
          login_page_local_state_from_user_global_state.set({
            user: result.data.user,
          });
          ToastAndroid.showWithGravityAndOffset(
            'Kayıt İşlemi Başarılı.',
            1000,
            1000,
            1000,
            1000,
          );
          setTimeout(() => {
            navigation.navigate('Tab');
          }, 1000);
        }
      } else {
        ToastAndroid.showWithGravityAndOffset(
          'Kayıt Olurken Hata.',
          1000,
          1000,
          1000,
          1000,
        );
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        ToastAndroid.showWithGravityAndOffset(
          'Giriş iptal edildi.',
          1000,
          1000,
          1000,
          1000,
        );
      } else if (error.code === statusCodes.IN_PROGRESS) {
        ToastAndroid.showWithGravityAndOffset(
          'Oturum devam etmekte.',
          1000,
          1000,
          1000,
          1000,
        );
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        ToastAndroid.showWithGravityAndOffset(
          'Play Servis mevcut değil.',
          1000,
          1000,
          1000,
          1000,
        );
      } else {
        console.log(error);
        ToastAndroid.showWithGravityAndOffset(
          String('Hata.'),
          1000,
          1000,
          1000,
          1000,
        );
      }
    }
  };
  async function onAppleButtonPress() {
    // performs login request
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      console.log(appleAuthRequestResponse.user)
    
      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
    
      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // user is authenticated
      }
    } catch (error) {
console.log(error)
    }
  }
  return (
      <SafeAreaView>
        <View style={styles.head_view}>
        <Image
          style={{width: 200, height: 200}}
          source={require('../../assets/logotrns.png')}></Image>
        {/* <Text style={styles.logoText}>GAMEBRİGE</Text> */}
       {Platform.OS === "ios"? <AppleButton
        buttonStyle={AppleButton.Style.WHITE}
        buttonType={AppleButton.Type.SIGN_IN}
        style={{
          width: 160, // You must specify a width
          height: 45, // You must specify a height
        }}
        onPress={() => onAppleButtonPress()}
      />
      : <GoogleSigninButton
          style={styles.googleButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={this.signIn}
        />} 
        
  
      </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  head_view: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButton: {
    width: 192,
    height: 48,
    alignSelf: 'center',
    alignContent: 'center',
  },
  logoText: {
    color: 'black',
    paddingVertical: 20,
    fontSize: 25,
  },
});
