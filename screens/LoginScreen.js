import React, { Component, useState } from "react";
import { StyleSheet, View, ImageBackground, Text, Image, TouchableOpacity, ScrollView,Alert} from "react-native";
import CustomInput from './CustomInput';
import {  } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleCreateAcc = () => {
    // Redirect to HomeScreen
    navigation.navigate('Signup'); // Replace 'HomeScreen' with the actual name of your HomeScreen component
  };
  
  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.1.8:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Use email and password state variables here
      });
  
      if (response.ok) {
        const result = await response.json();
        Alert.alert('Success', result.message);
  
        const userObject = {
          email,
        };
        await AsyncStorage.setItem('user', JSON.stringify(userObject));
  
        navigation.navigate('Home');
      } else {
        const result = await response.json();
        Alert.alert('Login Failed', result.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred during login.');
    }
  };
  
  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.rect1Stack}>
        <ImageBackground
          style={styles.rect1}
          imageStyle={styles.rect1_imageStyle}
          source={require("./loginBackgd.png")}
        >
          <Text style={styles.signIn}>Sign In</Text>
        </ImageBackground>
        <View style={styles.rect2}>
          <View style={styles.rect3}></View>
          <Image
            source={require("./slogann.png")}
            resizeMode="contain"
            style={styles.image1}
          ></Image>
          {/* <View style={styles.rect4}></View>
          <View style={styles.rect5}></View> */}
           <CustomInput style={styles.rect4}  value={email} onChangeText={setEmail} placeholder="Enter your e-mail" 
           icon={<Icon name="account" size={20} color="#555" />} />
           <CustomInput style={styles.rect5}  value={password} onChangeText={setPassword} placeholder="Enter your password" 
           icon={<Icon name="lock" size={20} color="#555" />}/>
           <TouchableOpacity style={styles.rect6} onPress={handleLogin}>
            <Text style={styles.login}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.or2}>OR</Text>
          <TouchableOpacity style={styles.rect7} onPress={handleCreateAcc}>
            <Text style={styles.createAccount}>Create account</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rect1: {
    left: 0,
    width: 395,
    height: 858,
    position: "absolute",
    top: 0
  },
  rect1_imageStyle: {},
  signIn: {
    width: "100%", // Ensure the gradient image covers the entire width
    height: "100%",
    fontFamily: "sans-serif-light",
    color: "rgba(100,71,34,1)",
    fontSize: 30,
    marginTop: 218,
    marginLeft: 144, fontWeight:'bold'
  },
  rect2: {
    top: 315,
    left: 0,
    width: 390,
    height: 564,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 51,
    shadowColor: "rgba(139,87,42,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
     shadowOpacity: 0.18,
    shadowRadius: 0
  },
  rect3: {
    width: 29,
    height: 1,
    backgroundColor: "rgba(16,0,0,1)",
    marginTop: 10,
    marginLeft: 175
  },
  image1: {
    width: 106,
    height: 78,
    marginTop: 30,
    marginLeft: 140
  },
  rect4: {
    marginTop:35,
    marginLeft: 45
  },
  rect5: {
     
    marginLeft: 45
  },
  rect6: {
    width: 149,
    height: 44,
    backgroundColor: "rgba(225,153,64,1)",
    borderRadius: 50,
    marginTop: 31,
    marginLeft: 120
  },
  login: {
    fontFamily: "sans-serif-light",
    color: "rgba(82,58,30,1)",
    fontSize: 22,
    marginTop: 9,
    marginLeft: 47
  },
  or2: {
    fontFamily: "sans-serif-light",
    color: "#121212",
    marginTop: 58,
    marginLeft: 185
  },
  rect7: {
    width: 180,
    height: 35,
    backgroundColor: "rgba(225,153,64,0.3)",
    borderRadius: 50,
    marginTop: 10,
    marginLeft: 105
  },
  createAccount: {
    fontFamily: "sans-serif-light",
    color: "rgba(82,58,30,1)",
    fontSize: 18,
    marginTop: 4,
    marginLeft: 30
  },
  rect1Stack: {
    width: 375,
    height: 879,
    marginTop: -36
  }
});

export default LoginScreen;
