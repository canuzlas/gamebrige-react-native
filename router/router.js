import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import MyBlogsIcon from 'react-native-vector-icons/FontAwesome5'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/* paths */
import Home from "../src/home/home";
import StartPage from "../src/startPage/startPage";
import LoginPage from "../src/loginPage/loginPage";
import BlogWritePage from "../src/blogWrite/blogWrite"
import MyBlogsPage from "../src/myBlogs/myBlogs"
import EditBlogPage from "../src/editBlog/editBlog"
import ProfilePage from "../src/profile/profilePage"
import LandingPage from "../src/landingPage/landingPage"
import DiscoverPage from "../src/discover/discoverPage"

/*  */
const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
      headerText: { color: '#BB86CC', fontSize: 20, fontWeight: '600' },
      tabBarActiveTintColor: '#A6E3E9',
      tabBarInactiveTintColor: '#71C9CE',
      tabBarStyle: { backgroundColor: '#E3FDFD', borderTopWidth: 0 },
      headerStyle: { backgroundColor: 'black', shadowColor: 'transparent', height: 70 },
      headerTitleStyle: { color: '#BB86CC' },
      headerTitleAlign: 'center'
    }} initialRouteName='Home'>  
      <Tab.Screen options={{ tabBarIcon: ({ color }) => <Icon name={'home'} color={color} size={30}></Icon> , tabBarLabel: 'Anasayfa', headerShown: false }} component={Home} name='Home' />
      <Tab.Screen options={{ tabBarIcon: ({ color }) => <MyBlogsIcon name={'blog'} color={color} size={30}></MyBlogsIcon>, tabBarLabel: 'Bloglarım', headerShown: false }} component={MyBlogsPage} name='MyBlogs' />
      <Tab.Screen options={{ tabBarIcon: ({ color }) => <IconFontAwesome name={'moon-o'} color={color} size={30}></IconFontAwesome>, tabBarLabel: 'Keşfet', headerShown: false }} component={DiscoverPage} name='Discover' />
    </Tab.Navigator>
  )
}
class Router extends React.Component { 
  render() {
    return (
      <NavigationContainer >
        <Stack.Navigator initialRouteName='StartPage' screenOptions={{ headerShown: false }}>
          <Stack.Screen component={TabNavigator} name={'Tab'} />
          <Stack.Screen component={StartPage} name={'StartPage'} />
          <Stack.Screen component={LandingPage} name={'LandingPage'} />
          <Stack.Screen component={LoginPage} name={'LoginPage'} />
          <Stack.Screen component={BlogWritePage} name={'BlogWrite'} />
          <Stack.Screen component={ProfilePage} name={'Profile'} />
          <Stack.Screen component={EditBlogPage} name={'EditBlog'} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
export default Router