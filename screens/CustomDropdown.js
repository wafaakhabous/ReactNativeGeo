import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';

const CustomDropdown = ({ options, onSelect, placeholder, value }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={{ height: 54, borderRadius: 50, backgroundColor: "#E6E6E6", marginTop: 9, marginLeft: 41, justifyContent: 'center', paddingHorizontal: 20 }}>
        <Text>{value || placeholder}</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setModalVisible(false)}
          />
          <View style={{ backgroundColor: '#fff', padding: 20 }}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => { onSelect(item); setModalVisible(false); }}>
                  <Text style={{ fontSize: 18, paddingVertical: 10 }}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomDropdown;
