// CustomInput.js
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomInput1 = ({ style, placeholder, value, onChangeText, icon }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    // Format the date using moment.js or any other date formatting library
    const formattedDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
    onChangeText(formattedDate);
  };

  return (
    <View style={[styles.container, style]}>
      {icon}
      <TouchableOpacity onPress={showDatePicker}>
        <Icon name="calendar" size={20} color="#555" />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        editable={false}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
});

export default CustomInput1;
