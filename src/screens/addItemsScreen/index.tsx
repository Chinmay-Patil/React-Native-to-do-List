import React, {useState, useLayoutEffect} from 'react';
import {View, TextInput, Button, StyleSheet,Alert} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import {Item} from '../listScreen';

type AddItemScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddItem'
>;
type AddItemScreenRouteProp = RouteProp<RootStackParamList, 'AddItem'>;

type Props = {
  navigation: AddItemScreenNavigationProp;
  route: AddItemScreenRouteProp;
};

export default function AddItemScreen({
  navigation,
  route,
}: Props): React.JSX.Element {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleAddItem = () => {
    if (name.trim() === '') {
      Alert.alert('Please enter a name for the item');
      return;
    }

    const newItem: Item = {
      id: Date.now().toString(),
      name: name.trim(),
      description: description.trim(),
    };

    route.params.addItem(newItem);
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.buttonContainer}>
          <Button title="Add Item" onPress={handleAddItem} />
        </View>
      ),
    });
  }, [navigation, name, description]);

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
        multiline
      />
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
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonContainer: {
    marginRight: 10,
    marginTop: 10,
  },
});

