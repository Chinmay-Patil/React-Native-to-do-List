import AsyncStorage from '@react-native-async-storage/async-storage';
import {saveItems, getItems} from './index';
import {Item} from '../../screens/listScreen';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

describe('AsyncStorage functions', () => {
  const ITEMS_STORAGE_KEY = '@items';
  const mockItems: Item[] = [
    {
      id: '1',
      name: 'Item 1',
      description: 'Description 1',
    },
    {
      id: '2',
      name: 'Item 2',
      description: 'Description 2',
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should save items to AsyncStorage', async () => {
    await saveItems(mockItems);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      ITEMS_STORAGE_KEY,
      JSON.stringify(mockItems),
    );
  });

  it('should handle error when saving items to AsyncStorage', async () => {
    (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(
      new Error('AsyncStorage error'),
    );
    console.error = jest.fn();

    await saveItems(mockItems);

    expect(console.error).toHaveBeenCalledWith(
      'Error saving items:',
      new Error('AsyncStorage error'),
    );
  });

  it('should get items from AsyncStorage', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify(mockItems),
    );

    const items = await getItems();

    expect(items).toEqual(mockItems);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith(ITEMS_STORAGE_KEY);
  });

  it('should return an empty array if no items are found in AsyncStorage', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

    const items = await getItems();

    expect(items).toEqual([]);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith(ITEMS_STORAGE_KEY);
  });

  it('should handle error when getting items from AsyncStorage', async () => {
    (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(
      new Error('AsyncStorage error'),
    );
    console.error = jest.fn();

    const items = await getItems();

    expect(items).toEqual([]);
    expect(console.error).toHaveBeenCalledWith(
      'Error getting items:',
      new Error('AsyncStorage error'),
    );
  });
});
