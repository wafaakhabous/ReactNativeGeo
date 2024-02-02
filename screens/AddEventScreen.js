import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { ScrollView, View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground, Image,TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome"; 
import Svg, { Ellipse } from "react-native-svg";
import CustomInput1 from './CustomInput1';
import CustomInput from './CustomInput';
import CustomDropdown from './CustomDropdown'; 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const AddEventScreen = ({ navigation, updateMap }) => {
  const [sport, setSport] = useState('');
  const [description, setDescription] = useState('');
  const [numPersonsNeeded, setNumPersonsNeeded] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [location, setLocation] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleAddEvent = async () => {
    try {
      const userEmail = await AsyncStorage.getItem('user');
      const response = await fetch('http://192.168.1.8:3001/addEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sport,
          description,
          numPersonsNeeded,
          dateTime,
          location: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
          userEmail, 
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Event added successfully:', result);
        Alert.alert('Event added successfully', result.message);
      } else {
        console.error('Event addition failed:', result.message);
      }
    } catch (error) {
      console.error('Event addition error:', error);
    }
  };



  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setLocation({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });
  };
  
  const [currentUser, setCurrentUser] = useState(null);
  const loadCurrentUser = async () => {
    try {
      const userEmailString = await AsyncStorage.getItem('user');
      
      const userEmailObject = JSON.parse(userEmailString);
      const userEmail = userEmailObject.email;
  
      console.log('User Email:', userEmail);
        const response = await fetch(`http://192.168.1.8:3001/getUser/${userEmail}`);
      const userData = await response.json();
  
      if (response.ok) 
      {
        setCurrentUser(userData);
      } else 
      {
        console.error('Failed to fetch user details:', userData.message);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }

  };
  useEffect(() => {
     loadCurrentUser();
  }, []);
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
    return (
      <ScrollView contentContainerStyle={styles.container}>
         
        <View>
        <ImageBackground
          style={styles.rect4}
        >
          <View style={styles.icon4Row}>
          <TouchableOpacity   onPress={toggleSidebar}>
          <FontAwesomeIcon
              name="align-justify"
              style={styles.icon4}
            ></FontAwesomeIcon> 
      </TouchableOpacity> 
              
          </View>
        </ImageBackground>

<View style={{ flex: 1 }}>
  
        <TouchableOpacity style={styles.sidebarToggle} onPress={toggleSidebar}>
      </TouchableOpacity>

      {sidebarVisible && currentUser && (
        <View style={styles.sideNavBar}>
            <TouchableOpacity >
            <Image
              source={
                currentUser.sex === 'male'
                  ? require('./images/Male.png')
                  : require('./images/Female.png')
              }
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>{currentUser.name}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('profile')}>
          <Text style={styles.buttonText}>Profil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('PostEvent')}>
            <Text style={styles.buttonText}>Ajouter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('MyEvents')}>
            <Text style={styles.buttonText}>Evenements</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Demandes')}>
            <Text style={styles.buttonText}>Demandes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton1} onPress={handleLogout}>
            <Text style={styles.buttonText}>Quit</Text>
          </TouchableOpacity>
        </View>
      )}
      </View> 
      </View>
    
      
      <Text style={styles.signUp}>Add Event</Text> 
<CustomInput style={styles.rect2}    placeholder="Description" value={description}  onChangeText={setDescription}
        icon={<Icon name="information-outline" size={20} color="#555" />}/>
 
        <CustomInput style={styles.rect2} keyboardType="numeric"   placeholder="numPersonsNeeded" value={numPersonsNeeded}  onChangeText={setNumPersonsNeeded}
        icon={<Icon name="counter" size={20} color="#555" />}/>

        <CustomInput style={styles.rect2}    placeholder="dateTime" value={dateTime}  onChangeText={setDateTime}
        icon={<Icon name="calendar" size={20} color="#555" />}/>
 <View style={styles.row}>
          <Picker
            selectedValue={sport}
            onValueChange={(itemValue) => setSport(itemValue)}
            dropdownIconColor="orange"
            style={styles.picker}
          >
            <Picker.Item label="Select Sport" value="" style={styles.pickerItem} />
            <Picker.Item label="Football" value="football" />
            <Picker.Item label="Basketball" value="basketball" />
            <Picker.Item label="Volleyball" value="volleyball" />
            <Picker.Item label="Cycling" value="cycling" />
          </Picker>
        </View>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            onPress={handleMapPress}
            showsUserLocation={true}
            followsUserLocation={true}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {location && <Marker coordinate={location} />}
          </MapView>
        </View>
      
        <TouchableOpacity style={styles.rect10} onPress={handleAddEvent}>
          <Text style={styles.submit}>Post</Text>
        </TouchableOpacity>
        
         </ScrollView>
    );
  };

const styles = StyleSheet.create({
  sidebarToggle: {
    position: 'absolute',
    top: -40,
    right: 20,
    zIndex: 2,
  },
  rect10: {
    width: 149,
    height: 44,
    backgroundColor: "rgba(132,77,7,1)",
    borderRadius: 50,
    marginTop: 25,
    marginLeft: 115,
    alignContent:'center',
  },
  submit: {
    fontFamily: "sans-serif-light",
    color: "white",
    fontSize: 22,
    marginTop: 9,
    marginLeft: 53,
    // fontWeight:'bold',
  },
  icon4Row: {
    height: 40,
    flexDirection: "row",
    flex: 1,
    marginRight: 13,
    marginLeft: 22,
    marginTop: 47,
  },
  profileName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color:'black',
  },
  signUp: {
    fontFamily: "sans-serif-light",
    color: "rgba(100,71,34,1)",
    fontSize: 30,
    marginTop: -20,
    marginLeft: 119,
    fontWeight:'bold',
    bottom:40
  },
  sideNavBar: {
    position: 'absolute',
    shadowColor: "rgba(0,0,0,1)",
    elevation: 160,
    top: -98,
    left: -60,
    width: 313,
    height: 718,
    backgroundColor: 'white',  
    paddingVertical: 80,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 2,
    borderRadius: 66,
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 12,
    shadowRadius: 100,
  },
  rect1: {
    width: 390,
    height: 829,
    marginBottom:30,
  },
  rect2 : {
    marginTop:-22,
    marginLeft: 45,
    marginBottom:30,
  },
  rect1_imageStyle: {},
  image1: {
    width: 62,
    height: 47,
    marginTop: 62,
    marginLeft: 158,
  },
  buttonText: {
    color: 'rgba(100,71,34,1)',
    fontWeight: 'bold',
  },
  navButton: {
    width: 169,
    height: 38,
    backgroundColor: "rgba(175, 105, 29, 0.4)",
    shadowColor: "rgba(0,0,0,1)",
     
    shadowOffset: {
      width: 3,
      height: 3
    },
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    borderRadius: 39,
    marginTop: 20,
    marginLeft: 52
  },
  navButton1: {
    width: 169,
    height: 38,
    backgroundColor: "rgba(175, 105, 29, 0.4)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderRadius: 39,
    marginTop: 160,
    marginLeft: 52
  },
  rect4: {
    
    width: 500,
    height: 105,
    flexDirection: "row",
    left:-18,
    top:-98,
    backgroundColor: "rgba(82,58,30,1)",

  },
 
  rect4_imageStyle: {},
  icon4: {
    position: 'absolute',
    color: "rgba(45,35,12,1)",
    fontSize: 40,
    height: 40,
    width: 40,
    left:310,
  },
  profileImage: {
    width: 120, // Adjust the width and height according to your preference
    height: 120,
    borderRadius: 60, // Make it half of the width/height to create a circle
    left:20,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  picker: {
    height: 30,
    marginBottom: 0,
    left:100,
    width: 160,
    fontWeight: '100',
    fontSize: 12,
  },
  pickerItem: {
    color: 'gray',
  },
  mapContainer: {
    height: 200,
    marginBottom: 16,
  },
  map: {
    flex: 1,
  },
});

export default AddEventScreen;