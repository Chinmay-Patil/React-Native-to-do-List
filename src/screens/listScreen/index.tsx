import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import ListItem from '../../components/listItem';
import {getItems, saveItems} from '../../utils/storage';
import {RootStackParamList} from '../../../App';

type ListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'List'>;
type ListScreenRouteProp = RouteProp<RootStackParamList, 'List'>;

type Props = {
  navigation: ListScreenNavigationProp;
  route: ListScreenRouteProp;
};

export interface Item {
  id: string;
  name: string;
  description: string;
}

export default function ListScreen({navigation}: Props) {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const savedItems = await getItems();
    if (savedItems) setItems(savedItems);
  };

  const addItem = (newItem: Item) => {
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    saveItems(updatedItems);
  };

  const editItem = (updatedItem: Item) => {
    const updatedItems = items.map(item =>
      item.id === updatedItem.id ? updatedItem : item,
    );
    setItems(updatedItems);
    saveItems(updatedItems);
  };

  const deleteItem = (itemId: string) => {
    Alert.alert('Delete Item', 'Are you sure you want to delete this item?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'OK',
        onPress: () => {
          const updatedItems = items.filter(item => item.id !== itemId);
          setItems(updatedItems);
          saveItems(updatedItems);
        },
      },
    ]);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('AddItem', {addItem})}
          style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, items]);

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({item}) => (
          <ListItem 
            item={item}
            onEdit={() => navigation.navigate('EditItem', {item, editItem})}
            onDelete={() => deleteItem(item.id)}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    margin: 10,
    borderCurve: 'circular' 
  },
  addButton: {
    marginRight: 20,
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  }
});
