import React, { useEffect, useState, Component } from 'react';
import {   StyleSheet,FlatList, View, ImageBackground, Text, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyEvents = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
     const fetchUserEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('user');

        if (storedEmail) {
          setUserEmail(storedEmail);
        }
      } catch (error) {
        console.error('Error fetching user email from AsyncStorage:', error);
      }
    };

    fetchUserEmail();
  }, []);

  useEffect(() => {
     const fetchUserEvents = async () => {
      try {
        const response = await fetch(`http://192.168.1.8:3001/getEventsByEMail?userEmail=${userEmail}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const events = await response.json();

         const userEvents = events.filter((event) => {
          const eventUserEmail = event.userEmail && typeof event.userEmail === 'string' ?
            JSON.parse(event.userEmail).email :
            null;
          const storedUserEmail = userEmail && typeof userEmail === 'string' ?
            JSON.parse(userEmail).email :
            null;

          return eventUserEmail === storedUserEmail;
        });

        setUserEvents(userEvents);
      } catch (error) {
        console.error('Error fetching user events:', error.message);
      }
    };

    if (userEmail) {
      fetchUserEvents();
    }
  }, [userEmail]);

   const sportImages = {
    football: require('./images/football.png'),
    basketball: require('./images/basketball.png'),
    volleyball: require('./images/volleyball.png'),
    cycling: require('./images/cycling.png'),
   };

  const showDescriptionAlert = (description) => {
    Alert.alert(
      'Event Description',
      description,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
    );
  };

  return (
  
    <View style={styles.container}> 
       
     
  

        <Text style={styles.myEvenements}>My evenements</Text>
        <FlatList
        data={userEvents}
        keyExtractor={(item) => item._id}
        
        renderItem={({ item }) => (
          <View style={styles.rect4Row}>
          <View style={styles.rect4}>
            <Image
               source={sportImages[item.sport.toLowerCase()]}
              resizeMode="contain"
              style={styles.image8}
            ></Image>
            <View style={styles.rect10}>
              <Text style={styles.football}>{item.sport}</Text>
            </View> 
            
            <View style={styles.rect11}>
              <Text style={styles.description}>{item.numPersonsNeeded} people needed</Text>
            </View>
            <View style={styles.rect11}>
              <Text style={styles.description}>{item.dateTime}</Text>
            </View>
            <TouchableOpacity
                style={styles.rect11}
                onPress={() => showDescriptionAlert(item.description)}
              >
                <Text style={styles.football}>Description</Text>
              </TouchableOpacity>
            </View> 
          </View>
        )}
      />
   </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  rect1: {
    width: 395,
    height: 912
  },
  rect1_imageStyle: {},
  myEvenements: {
    fontFamily: "sans-serif-light",
    color: "rgba(100,71,34,1)",
    fontSize: 30,
    marginTop: 96,
    marginLeft: 84
  },
  rect4: {
    width: 338,
    height: 198,
    backgroundColor: "#CF8C3D",
    borderRadius: 11,
    shadowColor: "gray",
    shadowOffset: {
      width: 3,
      height: 3
    },
    alignItems: "center", // Center content horizontally
    justifyContent: "center", // Center content vertically
    elevation: 10,
    shadowOpacity: 0.2,
    shadowRadius:10,
  
  },
  image8: {
    height: 50,
    width: 50,
    backgroundColor: "rgba(15,15, 15,0)",
    marginTop: 13,
    marginLeft: 20
  },
  rect10: {
    width: 206,
    height: 22,
    backgroundColor: "rgba(253,253,252,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    borderRadius: 39,
    marginTop: 12,
    marginLeft: 18
  },
  football: {
    fontFamily: "sans-serif-light",
    color: "rgba(100,71,34,1)",
    fontSize: 10,
    marginTop: 5,fontWeight:'bold',
    marginLeft: 35
  },
  rect11: {
    width: 206,
    height: 22,
    backgroundColor: "rgba(253,253,252,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    borderRadius: 39,
    marginTop: 5,
    marginLeft: 18
  },
  description: {
    fontFamily: "sans-serif-light",
    color: "rgba(100,71,34,1)",
    fontSize: 10,
    marginTop: 5,
    marginLeft: 28, fontWeight:'bold',
  },
  rect12: {
    width: 106,
    height: 22,
    backgroundColor: "rgba(253,253,252,0.77)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    borderRadius: 39,
    marginTop: 5,
    marginLeft: 18
  },
  football3: {
    fontFamily: "sans-serif-light",
    color: "rgba(100,71,34,1)",
    fontSize: 10,
    marginTop: 5,
    marginLeft: 16
  },
  rect13: {
    width: 106,
    height: 22,
    backgroundColor: "rgba(253,253,252,0.77)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    borderRadius: 39,
    marginTop: 5,
    marginLeft: 18
  },
  football4: {
    fontFamily: "sans-serif-light",
    color: "rgba(100,71,34,1)",
    fontSize: 10,
    marginTop: 5,
    marginLeft: 11
  },
  rect14: {
    width: 142,
    height: 198,
    backgroundColor: "rgba(230,230,230,1)",
    borderRadius: 31,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 30,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    marginLeft: 41
  },
  image9: {
    height: 55,
    width: 51,
    backgroundColor: "rgba(15,15, 15,0)",
    marginTop: 13,
    marginLeft: 46
  },
  rect15: {
    width: 106,
    height: 22,
    backgroundColor: "rgba(253,253,252,0.77)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    borderRadius: 39,
    marginTop: 7,
    marginLeft: 18
  },
  basketball: {
    fontFamily: "sans-serif-light",
    color: "rgba(100,71,34,1)",
    fontSize: 10,
    marginTop: 5,
    marginLeft: 30
  },
  rect16: {
    width: 106,
    height: 22,
    backgroundColor: "rgba(253,253,252,0.77)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    borderRadius: 39,
    marginTop: 5,
    marginLeft: 18
  },
  description1: {
    fontFamily: "sans-serif-light",
    color: "rgba(100,71,34,1)",
    fontSize: 10,
    marginTop: 5,
    marginLeft: 28
  },
  rect17: {
    width: 106,
    height: 22,
    backgroundColor: "rgba(253,253,252,0.77)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    borderRadius: 39,
    marginTop: 5,
    marginLeft: 18
  },
  football5: {
    fontFamily: "sans-serif-light",
    color: "rgba(100,71,34,1)",
    fontSize: 10,
    marginTop: 5,
    marginLeft: 16
  },
  rect18: {
    width: 106,
    height: 22,
    backgroundColor: "rgba(253,253,252,0.77)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    borderRadius: 39,
    marginTop: 5,
    marginLeft: 18
  },
  football6: {
    fontFamily: "sans-serif-light",
    color: "rgba(100,71,34,1)",
    fontSize: 10,
    marginTop: 5,
    marginLeft: 12
  },
  rect4Row: {
    height: 200,
    flexDirection: "row",
    marginTop: 41,
    marginLeft: 26,
    marginRight: 24
  }
});

export default MyEvents;
