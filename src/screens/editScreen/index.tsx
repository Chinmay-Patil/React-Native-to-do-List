import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import {Item} from '../listScreen';

type EditItemScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EditItem'
>;
type EditItemScreenRouteProp = RouteProp<RootStackParamList, 'EditItem'>;

type Props = {
  navigation: EditItemScreenNavigationProp;
  route: EditItemScreenRouteProp;
};

export default function EditItemScreen({navigation, route}: Props) {
  const {item, editItem} = route.params;
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);

  const handleSave = () => {
    if (name.trim() === '' || description.trim() === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const updatedItem: Item = {...item, name, description};
    editItem(updatedItem);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Item Description"
        value={description}
        onChangeText={setDescription}
        multiline={true}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
