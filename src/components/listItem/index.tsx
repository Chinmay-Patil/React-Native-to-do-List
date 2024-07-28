import React from 'react';
import {View, Text, StyleSheet, Touchable} from 'react-native';
import {Item} from '../../screens/listScreen';
import {TouchableOpacity} from 'react-native-gesture-handler';

type Props = {
  item: Item;
  onEdit: () => void;
  onDelete: () => void;
};

export default function ListItem({item, onEdit, onDelete}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={onEdit} style={styles.button}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.button}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#777',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    marginRight: 10,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});
