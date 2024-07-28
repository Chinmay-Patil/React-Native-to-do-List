import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ListScreen from './src/screens/listScreen';
import AddItemScreen from './src/screens/addItemsScreen';
import EditItemScreen from './src/screens/editScreen';

export type RootStackParamList = {
  List: undefined;
  AddItem: {addItem: (item: Item) => void};
  EditItem: {item: Item; editItem: (item: Item) => void};
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen
          name="List"
          component={ListScreen}
          options={{title: 'To Do List'}}
        />
        <Stack.Screen
          name="AddItem"
          component={AddItemScreen}
          options={{title: 'Add New Item'}}
        />
        <Stack.Screen
          name="EditItem"
          component={EditItemScreen}
          options={{title: 'Edit Item'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export interface Item {
  id: string;
  name: string;
  description: string;
}
