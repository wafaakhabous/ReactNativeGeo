import React, { useState, useEffect, Component } from 'react';
import { View, Text, StyleSheet , ImageBackground, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Ellipse, Image } from "react-native-svg";
import Icon from "react-native-vector-icons/Entypo";

const ProfileScreen = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user details when the component mounts
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      // Get the user email from AsyncStorage
      const userEmailString = await AsyncStorage.getItem('user');
      
      // Parse the JSON string to extract the email
      const userEmailObject = JSON.parse(userEmailString);
      const userEmail = userEmailObject.email;
  
      console.log('User Email:', userEmail);
  
      // Fetch user details based on the email
      const response = await fetch(`http://192.168.1.8:3001/getUser/${userEmail}`);
      const userData = await response.json();
  
      if (response.ok) {
        setUser(userData);
      } else {
        console.error('Failed to fetch user details:', userData.message);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };
  
  
  if (!user) {
    // Render loading or placeholder while user data is being fetched
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }


  // Determine the avatar source based on the user's gender (assuming user has a 'sex' property)
  const avatarSource = user.sex === 'male'
    ? require('./Male.png')
    : require('./Female.png');
 

  return (
    // <View style={styles.container}>
    //   <View style={styles.avatarContainer}>
    //     <Image
    //       source={avatarSource}
    //       style={styles.avatar}
    //     />
    //     <Text style={styles.name}>{`${user.firstName} ${user.lastName}`}</Text>
    //   </View>
    //   <View style={styles.infoContainer}>
    //     <Text style={styles.infoLabel}>Email:</Text>
    //     <Text style={styles.infoValue}>{user.email}</Text>
    //   </View>
    //   <View style={styles.infoContainer}>
    //     <Text style={styles.infoLabel}>Phone Number:</Text>
    //     <Text style={styles.infoValue}>{user.phoneNumber}</Text>
    //   </View>
    //   <View style={styles.infoContainer}>
    //     <Text style={styles.infoLabel}>Favorite Sport:</Text>
    //     <Text style={styles.infoValue}>{user.favoriteSport}</Text>
    //   </View>
    //   <View style={styles.infoContainer}>
    //     <Text style={styles.infoLabel}>Competences Level:</Text>
    //     <Text style={styles.infoValue}>{user.competence}%</Text>
    //   </View>
    //   <View style={styles.infoContainer}>
    //     <Text style={styles.infoLabel}>About:</Text>
    //     <Text style={styles.infoValue}>{user.about}</Text>
    //   </View>
      
    //   {/* Add more user details as needed */}
    // </View>
    <ScrollView style={styles.container}>
    <View style={styles.rectStack}>
      <ImageBackground
        style={styles.rect}
        imageStyle={styles.rect_imageStyle}
        source={require("./profilBg.png")}
      >
        <Svg viewBox="0 0 125.55 122" style={styles.ellipse1}>
          {/* <Ellipse
            stroke="rgba(230, 230, 230,1)"
            strokeWidth={0}
            cx={63}
            cy={61}
            rx={63}
            ry={61}
            source={avatarSource}
          ></Ellipse>
            */}
             <Image
    x={0}
    y={0}
    width={125.55}
    height={122}
    xlinkHref={avatarSource}
  />
        </Svg>
      </ImageBackground>
      <View style={styles.rect1}>
        <View style={styles.rect3}></View>
        <Text style={styles.firstnameLastname}>{`${user.firstName} ${user.lastName}`}</Text>
        <View style={styles.rect4}>
          <View style={styles.rect8Row}>
            <View style={styles.rect8}>
              <Icon name="email" style={styles.icon}></Icon>
            </View>
            <View style={styles.emailStackColumn}>
              <View style={styles.emailStack}>
                <Text style={styles.email}>Email</Text>
                <Text style={styles.email3}>Email</Text>
              </View>
              <Text style={styles.email1}>{user.email}</Text>
            </View>
          </View>
        </View>
        <View style={styles.rect41}>
          <View style={styles.rect8Row}>
            <View style={styles.rect8}>
              <Icon name="phone" style={styles.icon}></Icon>
            </View>
            <View style={styles.emailStackColumn}>
              <View style={styles.emailStack}>
                <Text style={styles.email}>Phone Number</Text>
                <Text style={styles.email3}>Phone Number</Text>
              </View>
              <Text style={styles.email1}>{user.phoneNumber}</Text>
            </View>
          </View>
        </View>
        <View style={styles.rect42}>
          <View style={styles.rect8Row}>
            <View style={styles.rect8}>
              <Icon name="heart" style={styles.icon}></Icon>
            </View>
            <View style={styles.emailStackColumn}>
              <View style={styles.emailStack}>
                <Text style={styles.email}>Favorite Sport</Text>
                <Text style={styles.email3}>Favorite Sport</Text>
              </View>
              <Text style={styles.email1}>{user.favoriteSport}</Text>
            </View>
          </View>
        </View>
        <View style={styles.rect43}>
          <View style={styles.rect8Row}>
            <View style={styles.rect8}>
              <Icon name="arrow-up" style={styles.icon}></Icon>
            </View>
            <View style={styles.emailStackColumn}>
              <View style={styles.emailStack}>
                <Text style={styles.email}>Competences Level</Text>
                <Text style={styles.email3}>Competences Level</Text>
              </View>
              <Text style={styles.email1}>{user.competence} %</Text>
            </View>
          </View>
        </View>
        <View style={styles.rect43}>
          <View style={styles.rect8Row}>
            <View style={styles.rect8}>
              <Icon name="info" style={styles.icon}></Icon>
            </View>
            <View style={styles.emailStackColumn}>
              <View style={styles.emailStack}>
                <Text style={styles.email}>About</Text>
                <Text style={styles.email3}>About</Text>
              </View>
              <Text style={[styles.email1 ]}   >
                {user.about} </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rect: {
    top: 0,
    width: 414,
    height: 845,
    position: "absolute",
    borderRadius: 100,
    left: 0,
    overflow: "hidden"
  },
  rect_imageStyle: {},
  ellipse1: {
    width: 144,
    height: 134,
    marginTop: 195,
    marginLeft: 125
  },
  rect1: {
    top: 375,
    left: 9,
    width: 395,
    height: 750,
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
    width: 32,
    height: 1,
    backgroundColor: "rgba(94,81,81,1)",
    marginTop: 4,
    marginLeft: 171
  },
  firstnameLastname: {
    fontFamily: "sans-serif-light",
  color: "rgba(100,71,34,1)",
  fontSize: 30,
  marginTop: 11,
  marginLeft: "auto",
  marginRight: "auto",
  textAlign: "center",
  fontWeight:"bold"
  },
  rect4: {
    width: 360,
    height: 67,
    backgroundColor: "#E6E6E6",
    borderRadius: 9,
    marginTop: 58,
    marginLeft: 16,
    bottom:2
  },
  rect41: {
    width: 360,
    height: 67,
    backgroundColor: "#E6E6E6",
    borderRadius: 9,
    marginTop: 18,
    marginLeft: 16,
    bottom:2
  },
  rect42: {
    width: 360,
    height: 67,
    backgroundColor: "#E6E6E6",
    borderRadius: 9,
    marginTop: 18,
    marginLeft: 16,
    bottom:2
  },
  rect43 : {
    width: 360,
    height: 67,
    backgroundColor: "#E6E6E6",
    borderRadius: 9,
    marginTop: 18,
    marginLeft: 16,
    bottom:2
  },
  rect8: {
    width: 57,
    height: 55,
    backgroundColor: "rgba(150,115,85,0.34)",
    borderRadius: 9
  },
  icon: {
    color: "rgba(128,128,128,1)",
    fontSize: 28,
    height: 30,
    width: 28,
    marginTop: 15,
    marginLeft: 14
  },
  email: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "sans-serif-light",
    color: "rgba(100,71,34,1)",
    fontSize: 20
  },
  email3: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "sans-serif-light",
    color: "rgba(100,71,34,1)",
    fontSize: 20,
    
  },
  emailStack: {
    width: 257,
    height: 27,
    marginLeft: 2,
    fontWeight:"bold",
  },
  email1: {
    fontFamily: "sans-serif-light",
    color: "rgba(100,71,34,1)",
    fontSize: 15,
    marginTop: 3
  },
  emailStackColumn: {
    width: 235,
    marginLeft: 12,
    marginBottom: 5
  },
  rect8Row: {
    height: 55,
    flexDirection: "row",
    marginTop: 5,
    marginLeft: 5,
    marginRight: 48
  },
  rectStack: {
    width: 414,
    height: 1125,
    marginTop: -136,
    marginLeft: -9
  }
});

export default ProfileScreen;
