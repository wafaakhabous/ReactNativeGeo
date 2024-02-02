import React , { useState } from "react";
import { StyleSheet, View, ImageBackground, Image, Text,TouchableOpacity,ScrollView, Alert  } from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import CustomInput1 from './CustomInput1';
import CustomInput from './CustomInput';
import CustomDropdown from './CustomDropdown';
import { Picker } from '@react-native-picker/picker';
import { Slider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


  


const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sex, setSex] = useState('');
  const [favoriteSport, setFavoriteSport] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [competence, setCompetence] = useState(50); 
  const [about, setAbout] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://192.168.1.8:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
          email,
          firstName,
          lastName,
          phoneNumber,
          sex,
          favoriteSport,
          competence,
          about,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Registration successful:', result);
        Alert.alert('Registration successful', result.message);

       } else {
        console.error('Registration failed:', result.message);
       }
    } catch (error) {
      console.error('Registration error:', error);
     }
  };
  const genderOptions = ['Male', 'Female', 'Other'];
  const sportOptions = ['Football', 'Basketball', 'Tennis', 'Other'];
  return (
    <View style={styles.container}>
      <ScrollView>
      <ImageBackground
        style={styles.rect1}
        imageStyle={styles.rect1_imageStyle}
        source={require("./images/SignUpBg.png")}
      >
        <Image
          source={require("./images/slogann.png")}
          resizeMode="contain"
          style={styles.image1}
        ></Image>
        <Text style={styles.signUp}>Sign Up</Text>
        <CustomInput style={styles.rect2}    placeholder="First Name" value={firstName}  onChangeText={setFirstName}
        icon={<Icon name="account-circle-outline" size={20} color="#555" />}/>
        <CustomInput style={styles.rect2}    placeholder="Last Name"value={lastName}   onChangeText={setLastName}
        icon={<Icon name="account-circle-outline" size={20} color="#555" />} />
        <CustomInput style={styles.rect2}    placeholder="Email" value={email}  onChangeText={setEmail} 
        keyboardType="email-address" icon={<Icon name="email-outline" size={20} color="#555" />}  />
        <CustomInput style={styles.rect2}    placeholder="Phone Number"  onChangeText={setPhoneNumber}  keyboardType="numeric"
        icon={<Icon name="phone-dial-outline" size={20} color="#555" />} />
        <CustomInput style={styles.rect2}    placeholder="Password"  secureTextEntry value={password} onChangeText={setPassword}
        icon={<Icon name="lock-outline" size={20} color="#555" />}  />
        <CustomInput style={styles.rect2}    placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} 
        icon={<Icon name="lock-outline" size={20} color="#555" />}  />
        <CustomInput style={styles.rect2}    placeholder="About Me"  multiline={true} numberOfLines={4} value={about} 
        onChangeText={setAbout} icon={<Icon name="information-outline" size={20} color="#555" />}  />
        <View style={styles.rect8Row}>
         
          <Picker 
          selectedValue={sex}
          onValueChange={(itemValue, itemIndex) => setSex(itemValue)}
          dropdownIconColor="rgba(132,77,7,1)"
          style={styles.rect9}
        >
          <Picker.Item label="Gender" value="" style={styles.pickerItem} />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Male" value="male" />
        </Picker>
        <Picker
          selectedValue={favoriteSport}
          onValueChange={(itemValue, itemIndex) => setFavoriteSport(itemValue)}
          style={styles.rect8}
          dropdownIconColor="rgba(132,77,7,1)"
        >
          <Picker.Item label="Favorite Sport" value="" style={styles.pickerItem} />
          <Picker.Item label="Football" value="football" />
          <Picker.Item label="Basketball" value="basketball" />
          <Picker.Item label="Volleyball" value="volleyball" />
          <Picker.Item label="Cycling" value="cycling" />
        </Picker>
        </View>

        <View >
        <Text style={styles.competenceLevel}>Competence Level:</Text>
        <Slider
          style={styles.rect11Stack}
          value={competence}
          minimumValue={0}
          maximumValue={100}
          thumbTintColor="rgba(132,77,7,1)" 
  minimumTrackTintColor="rgba(132,77,7,1)" 
  thumbStyle={{ width: 10, height: 10 }}

          onValueChange={(value) => setCompetence(value)}
        />
        <Text>                {Math.round(competence)}%</Text>
      </View>
  
        <TouchableOpacity style={styles.rect10} onPress={handleRegister}>
          <Text style={styles.submit}>Submit</Text>
        </TouchableOpacity>
      </ImageBackground>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rect1: {
    width: 390,
    height: 829,
    marginBottom:30,
  },
  rect1_imageStyle: {},
  image1: {
    width: 62,
    height: 47,
    marginTop: 62,
    marginLeft: 158,
  },
  signUp: {
    fontFamily: "sans-serif-light",
    color: "rgba(100,71,34,1)",
    fontSize: 30,
    marginTop: 16,
    marginLeft: 139,
    fontWeight:'bold'
  },
 rect2 : {
    marginTop:35,
    marginLeft: 45,
    marginBottom:-20,
  },
  rect7: {
    width: 180,
    height: 35,
    backgroundColor: "rgba(132,77,7,1)",
    borderRadius: 50,
    marginTop: 10,
    marginLeft: 105
  },
  rect8: {
    width: 180,
    height: 54, 
    marginTop:20,
    marginLeft: 22,
    marginBottom:-20,
  },
  rect9: {
    width: 130,
    height: 54, 
    marginTop:20,
    marginLeft: 22,
    marginBottom:-20,
  },
  rect8Row: {
    height: 54,
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 20,
    marginRight: 37,
  },
  competenceLevel: {
    fontFamily: "sans-serif-light",
    color: "#121212",
    marginTop: 33,
    marginLeft: 46,
  },
  rect11: {
    top: 4,
    left: 0,
    width: 285,
    height: 2,
    position: "absolute",
    backgroundColor: "rgba(19,1,1,1)",
  },
  ellipse: {
    top: 0,
    left: 121,
    width: 9,
    height: 9,
    position: "absolute",
  },
  rect11Stack: {
    width: 285,
    height: 9,
    marginTop: 16,
    marginLeft: 48,
  },
  rect10: {
    width: 149,
    height: 44,
    backgroundColor: "rgba(132,77,7,1)",
    borderRadius: 50,
    marginTop: 25,
    marginLeft: 115,
  },
  submit: {
    fontFamily: "sans-serif-light",
    color: "rgba(226,215,203,1)",
    fontSize: 22,
    marginTop: 9,
    marginLeft: 39,
  },
});

export default RegisterScreen;
