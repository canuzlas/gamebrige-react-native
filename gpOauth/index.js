import {GOOGLE_CLIENT_ID,GOOGLE_CLIENT_IOS_ID} from '@env';
import {GoogleSignin} from '@react-native-google-signin/google-signin';


GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  webClientId: GOOGLE_CLIENT_ID,
  iosClientId:GOOGLE_CLIENT_IOS_ID,
  offlineAccess: true,
  forceCodeForRefreshToken: true,
  profileImageSize: 120,
});
