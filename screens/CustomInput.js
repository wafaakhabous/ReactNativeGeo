// CustomInput.js
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomInput = ({ style, placeholder, value, keyboardType, onChangeText, icon }) => (
  <View style={[styles.inputContainer, style]}>
    {icon}
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#808080"
      value={value}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      underlineColorAndroid="transparent" // Remove underline
    />
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1, // Add a border instead of using a rounded box
    borderBottomColor: '#723E04',
    marginBottom: 30, // Adjust margin bottom as needed
    marginRight:35,
  },
  icon: {
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40, // Adjust height as needed
    paddingHorizontal: 10,
  },
});

export default CustomInput;
