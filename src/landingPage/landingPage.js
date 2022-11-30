import React, {useEffect} from 'react';
import {Text, View, Image, ImageBackground, Touchable, TouchableOpacity, SafeAreaView} from 'react-native';

const StartPage = ({navigation}) => {

 
  return (
    <SafeAreaView>
      <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#E3FDFD'
      }}>
        {/* <Video style={{width:'100%', height:'100%'}} source={video}  repeat={true} paused={false} /> */}
        <ImageBackground resizeMode="cover" style={{width:'100%', height:'100%', justifyContent: 'center',
        alignItems: 'center',}} source={require('../../assets/bg-landing.jpeg')}>
            <Text style={{color:"white",fontSize:50,marginBottom:40}}>GAMEBRİGE</Text>
            <Text style={{color:"white",fontSize:15}}>Oyunlarla ilgili keyifli bloglar arıyorsan hadi başlayalım..</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('LoginPage')} style={{alignSelf:"center",position:"absolute",bottom:40,borderRadius:10,borderColor:'white',borderWidth:1,padding:15}}><Text style={{fontSize:25,color:'white'}}>Devam et</Text></TouchableOpacity>
        </ImageBackground>
    </View>
    </SafeAreaView>
  );
};
export default StartPage;
