import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Modal, ScrollView, TextInput, Alert, Image  } from 'react-native';
import MapView, { Marker, Callout, Polyline } from 'react-native-maps';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import polyline from '@mapbox/polyline';
import * as Location from 'expo-location';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons,MaterialIcons  } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = ({ navigation }) => {

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [desLatitude, setDesLatitude] = useState(null);
  const [desLongitude, setDesLongitude] = useState(null);
  const [coords, setCoords] = useState([]);
  const [distance, setDistance] = useState(null);
  const [time, setTime] = useState(null);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(false);

useEffect(() => {
  const fetchData = async () => {
    await fetchEvents();
    await getLocation();
    loadCurrentUser();
  };

  fetchData();
}, []);

const getLocation = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      console.log('Permission denied');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);
  } catch (error) {
    console.log('Error:', error);
  }
};

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://192.168.1.8:3001/getEvents');
      const result = await response.json();
      if (response.ok) {
        setEvents(result);
        setFilteredEvents(result);
      } else
      {
        console.error('Failed to fetch events:', result.message);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const calculateShortestPath = async (event) => {
    if (latitude != null && longitude != null) {
      const startLoc = `${latitude},${longitude}`;
      const desLoc = `${event.location.latitude},${event.location.longitude}`;
      try {
        const apiKey = 'AIzaSyDcELAMQ7jNEno3GYitHGQza2O8wuye-Ok';
        const resp = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}&key=${apiKey}`
        );

        const respJson = await resp.json();

        if (!respJson.routes || respJson.routes.length === 0) {
          console.log('No routes found:', respJson);
          return;
        }

        const response = respJson.routes[0];

        if (!response.legs || response.legs.length === 0) {
          console.log('No legs found in the route');
          return;
        }

        const distanceTime = response.legs[0];
        const distance = distanceTime.distance.text;
        const time = distanceTime.duration.text;

        const points = polyline.decode(response.overview_polyline.points);
        const newCoords = points.map((point) => ({
          latitude: point[0],
          longitude: point[1],
        }));

        setCoords(newCoords);
        setDistance(distance);
        setTime(time);
        setRouteCoordinates(newCoords);
      } catch (error) {
        console.log('Error: ', error);
      }
    }
  };

  const handleMarkerPress = (event) => {
    setRouteCoordinates([]);
    calculateShortestPath(event);
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const handleSearch = () => {
    const filtered = events.filter((event) =>
      event.sport.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  const sendRequestToJoin = async () => {
    try {
      const userEmail = await AsyncStorage.getItem('user');
      const userObject = JSON.parse(userEmail);
      const { email } = userObject;

      const response = await fetch('http://192.168.1.8:3001/sendRequestToJoin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: selectedEvent._id,
          userId: email,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Request sent successfully:', result);
        Alert.alert('Request sent successfully', result.message);
      } else {
        console.error('Failed to send request:', result.message);
      }
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  const [currentUser, setCurrentUser] = useState(null);
  const loadCurrentUser = async () => {
    try {
       const userEmailString = await AsyncStorage.getItem('user');
      
       const userEmailObject = JSON.parse(userEmailString);
      const userEmail = userEmailObject.email;
  
      console.log('User Email:', userEmail);
  
      // Fetch user details based on the email
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
  return (
    <View style={{ flex: 1 }}>
      {/* --------------------------------------  NAVBAR / SIDEBAR ----------------------------------------------- */}
       <TouchableOpacity style={styles.sidebarToggle} onPress={toggleSidebar}>
      </TouchableOpacity>

      {/* Side Navigation Bar */}
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

      <View style={{ flex: 1 }}> 
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
             <View style={styles.rect5}>
              <TextInput
                style={styles.searchInput}
                placeholder="   Search an event ..."
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
                onSubmitEditing={handleSearch}
              />
            </View>
          </View>
        </ImageBackground>

{/* --------------------------------------  NAVBAR / SIDEBAR ----------------------------------------------- */}

{/* --------------------------------------  MAP ----------------------------------------------- */}

        {latitude !== null && longitude !== null && (
  <MapView
    showsUserLocation
    style={{ flex: 1 }}
    region={{
      latitude,
      longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  >
    {filteredEvents.map((event) => (
      <Marker
        key={event._id}
        coordinate={{
          latitude: event.location.latitude,
          longitude: event.location.longitude,
        }}
        title={event.sport}
        description={event.description}
        onPress={() => handleMarkerPress(event)}
      >
        <Callout>
          <View>
            <Text style={{ fontWeight: 'bold' }}>{event.sport}</Text>
            <Text>{event.description}</Text>
          </View>
        </Callout>
      </Marker>
    ))}
    {routeCoordinates.length > 0 && (
      <Polyline
        coordinates={routeCoordinates}
        strokeWidth={3}
        strokeColor="#00F"
      />
    )}
  </MapView>
)}
{/* --------------------------------------  MAP ----------------------------------------------- */}
{/* --------------------------------------  MAP ----------------------------------------------- */}



{/* --------------------------------------  DETAIL ENVENT ----------------------------------------------- */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <ScrollView>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}> ⚽  {selectedEvent?.sport}  ⚽</Text>
              <Text>Description: {selectedEvent?.description}</Text>
              <Text>Nombre de personnes :{selectedEvent?.numPersonsNeeded}</Text>
              <Text>dateTime :{selectedEvent?.dateTime}</Text>
            </ScrollView>
            <TouchableOpacity
              style={styles.joinButton}
              onPress={sendRequestToJoin}
            >
              <Text style={styles.buttonText}>Send request to join</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>

{/* --------------------------------------  DETAIL ENVENT ----------------------------------------------- */}


{/* --------------------------------------  ADD BUTTON ----------------------------------------------- */}

        <TouchableOpacity
          style={styles.topButton}
          onPress={() =>
            navigation.navigate('PostEvent', { updateMap: fetchEvents })
          }
        >
          <Icon name="plus" style={styles.plusIcon}></Icon>
        </TouchableOpacity>
{/* --------------------------------------  ADD BUTTON ----------------------------------------------- */}


      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebarToggle: {
    position: 'absolute',
    top: -40,
    right: 20,
    zIndex: 2,
  },
  plusButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#3498db',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    color: '#fff',
    fontSize: 40,
  },
  searchInput: {
    fontFamily: "sans-serif-light",
    color: "rgba(194,175,175,1)",
    fontSize: 17,
    marginTop: 10,
    marginLeft: 22,
    width: 240, // Adjust the width as needed
  },
  topButton: {
    position: 'absolute',
    elevation: 10,
    backgroundColor: "rgba(175, 105, 29, 0.5)", 
    top: 660,
    left: 290,
    borderRadius: 40,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999, // Add this line
    width: 89,
    height: 89,
  },
  rect4_imageStyle: {},
  icon4: {
    color: "rgba(45,35,12,1)",
    fontSize: 40,
    height: 40,
    width: 40,
    left:310,
  },
  rect5: {
    width: 298,
    height: 40,
    backgroundColor: "rgba(218,204,183,0.31)",
    borderRadius: 100,
    marginLeft: -45,
  },
  sideNavBar: {
    position: 'absolute',
    shadowColor: "rgba(0,0,0,1)",
    elevation: 160,
    top: 104,
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
  icon4Row: {
    height: 40,
    flexDirection: "row",
    flex: 1,
    marginRight: 13,
    marginLeft: 22,
    marginTop: 47,
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
    width: 395,
    height: 105,
    flexDirection: "row",
    backgroundColor: "rgba(82,58,30,1)",
     
  },
 
  profileImage: {
    width: 120, // Adjust the width and height according to your preference
    height: 120,
    borderRadius: 60, // Make it half of the width/height to create a circle
    left:20,
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  DemButton: {
    position: 'absolute',
    bottom: 16,
    right: 300,
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  EvsButton: {
    position: 'absolute',
    bottom: 16,
    right: 200,
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    padding: 20,
    marginTop:400,height:380,borderRadius:50
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  closeButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'rgba(100,71,34,1)',
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    elevation: 2,
    zIndex: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  profileName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color:'black',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    zIndex: 1,
  },
  searchButton: {
    fontSize: 16,
    width:60,
    marginRight:-30,
    zIndex: 1,
  },
  joinButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
    marginTop: -30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    position: 'absolute',
    bottom: 16,
    right: 100,
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;