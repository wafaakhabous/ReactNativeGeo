// App.js
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import HomePage from './screens/HomePage';
import RegisterScreen from './screens/RegisterScreen';
import AddEventScreen from './screens/AddEventScreen';
import RequestsList from './screens/RequestsList';
import MyEvents from './screens/MyEvents';
import ProfileScreen from './screens/ProfileView';
import ListWithIcon from './screens/ListWithIcon';
import Comments from './screens/Comments';
import CustomInput from './screens/CustomInput';
import CustomInput1 from './screens/CustomInput1';
import CustomDropdown from './screens/CustomDropdown';
import MapEvents from './screens/MapEvents';
import SideBar1 from './screens/SideBar1';

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        headerShown: false, // Hide the header for this specific screen
      },
    },
    Home:  {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false, // Hide the header for this specific screen
      },
    },
    Pagehome: {
      screen: HomePage,
      navigationOptions: {
        headerShown: false, // Hide the header for this specific screen
      },
    },
    Signup: {
      screen: RegisterScreen,
      navigationOptions: {
        headerShown: false, // Hide the header for this specific screen
      },
    },
    MapEvents: {
      screen: MapEvents,
      navigationOptions: {
        headerShown: false, // Hide the header for this specific screen
      },
    },
    SideBar1: {
      screen: SideBar1,
      navigationOptions: {
        headerShown: false, // Hide the header for this specific screen
      },
    },
    CustomInput:CustomInput,
    CustomInput1:CustomInput1,
    CustomDropdown:CustomDropdown,
    PostEvent: {
      screen: AddEventScreen,
      navigationOptions: {
        headerShown: false, // Hide the header for this specific screen
      },
    },
    Demandes: RequestsList,
    MyEvents:{
      screen: MyEvents,
      navigationOptions: {
        headerShown: false, // Hide the header for this specific screen
      },},
    profile: {
      screen: ProfileScreen,
      navigationOptions: {
        headerShown: false, // Hide the header for this specific screen
      },},
    req:ListWithIcon,
    comm:Comments
    
  },
  {
    initialRouteName: 'Pagehome',
  }
);

export default createAppContainer(AppNavigator);
