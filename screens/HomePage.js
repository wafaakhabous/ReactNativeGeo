import React from "react";
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, Text } from "react-native";

function HomePage({ navigation }) {
  const handleGetStarted = () => {
    // Redirect to HomeScreen
    navigation.navigate('Login'); // Replace 'HomeScreen' with the actual name of your HomeScreen component
  };

  return (
    <View style={styles.container}>
      
      <ImageBackground
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
        source={require("./images/gradient.png")}
      >
        <View style={styles.contentContainer}>
          <Image
            source={require("./images/logo1.png")}
            resizeMode="contain"
            style={styles.logoImage}
          />
          <TouchableOpacity style={styles.buttonContainer} onPress={handleGetStarted}>
            <View style={styles.overlay}>
              <Text style={styles.getStarted}>GET STARTED</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImageStyle: {
    width: "100%", // Ensure the gradient image covers the entire width
    height: "100%", // Ensure the gradient image covers the entire height
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: 118,
    height: 134,
    marginBottom: 20, // Adjust as needed
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50, // Adjust as needed
    left: 0,
    right: 0,
    alignItems: "center",
  },
  overlay: {
    width: 222,
    height: 56,
    borderRadius: 16,
    backgroundColor: "rgba(217,207,194,0.7)", // Adjust the alpha (fourth value) for overlay transparency
    justifyContent: "center",
    alignItems: "center",
  },
  getStarted: {
    fontFamily: "sans-serif-light",
    color: "#121212",
    fontSize: 20,
  },
});

export default HomePage;
