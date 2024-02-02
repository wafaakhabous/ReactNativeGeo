import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Svg, { Ellipse } from "react-native-svg";

function SideBar1(props) {
  return (
    <View style={styles.container}>
      <Icon name="align-justify" style={styles.icon}></Icon>
      <View gradientImage="Gradient_khXiDOI.png" style={styles.rect2}>
        <Svg viewBox="0 0 125.55 122" style={styles.ellipse}>
          <Ellipse
            stroke="rgba(230, 230, 230,1)"
            strokeWidth={0}
            fill="rgba(216,167,130,0.24)"
            cx={63}
            cy={61}
            rx={63}
            ry={61}
          ></Ellipse>
        </Svg>
        <View style={styles.rect7}></View>
        <View style={styles.rect8Row}>
          <View style={styles.rect8}></View>
          <View style={styles.rect4}></View>
        </View>
        <View style={styles.rect9}></View>
        <View style={styles.rect10}></View>
        <View style={styles.rect11}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  icon: {
    color: "rgba(45,35,12,1)",
    fontSize: 40,
    marginTop: 47,
    marginLeft: 22
  },
  rect2: {
    width: 333,
    height: 718,
    borderRadius: 66,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 1,
      height: 1
    },
    elevation: 120,
    shadowOpacity: 0.16,
    shadowRadius: 40,
    marginTop: 7,
    marginLeft: -70
  },
  ellipse: {
    width: 126,
    height: 122,
    marginTop: 47,
    marginLeft: 132
  },
  rect7: {
    width: 215,
    height: 38,
    backgroundColor: "rgba(216,167,130,0.5)",
    opacity: 0.45,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    borderRadius: 39,
    marginTop: 60,
    marginLeft: 92
  },
  rect8: {
    width: 215,
    height: 38,
    backgroundColor: "rgba(216,167,130,0.5)",
    opacity: 0.45,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    borderRadius: 39
  },
  rect4: {
    width: 1,
    height: 22,
    backgroundColor: "rgba(0,0,0,1)",
    marginLeft: 22,
    marginTop: 23
  },
  rect8Row: {
    height: 45,
    flexDirection: "row",
    marginTop: 22,
    marginLeft: 92,
    marginRight: 3
  },
  rect9: {
    width: 215,
    height: 38,
    backgroundColor: "rgba(216,167,130,0.5)",
    opacity: 0.45,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    borderRadius: 39,
    marginTop: 17,
    marginLeft: 92
  },
  rect10: {
    width: 215,
    height: 38,
    backgroundColor: "rgba(216,167,130,0.5)",
    opacity: 0.45,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    borderRadius: 39,
    marginTop: 19,
    marginLeft: 92
  },
  rect11: {
    width: 215,
    height: 38,
    backgroundColor: "rgba(216,167,130,0.5)",
    opacity: 0.45,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    borderRadius: 39,
    marginTop: 170,
    marginLeft: 92
  }
});

export default SideBar1;
