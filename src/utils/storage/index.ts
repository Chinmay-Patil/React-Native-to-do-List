import AsyncStorage from '@react-native-async-storage/async-storage';
import {Item} from '../../screens/listScreen';

const ITEMS_STORAGE_KEY = '@items';

export const saveItems = async (items: Item[]) => {
  try {
    await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving items:', error);
  }
};

export const getItems = async (): Promise<Item[]> => {
  try {
    const items = await AsyncStorage.getItem(ITEMS_STORAGE_KEY);
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error('Error getting items:', error);
    return [];
  }
};
