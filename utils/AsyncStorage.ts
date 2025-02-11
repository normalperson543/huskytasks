import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToDoItem } from './types';
export const getToDoItems = async (set: (value: ToDoItem[]) => void, firstTime: () => void) => {
  try {
    const jsonValue = await AsyncStorage.getItem('todo-items');
    if (jsonValue == null) {
      set([]);
      storeToDoItems([]);
      firstTime();
    } else {
      set(JSON.parse(jsonValue as string))
    }
  } catch (e) {
    alert("There was a problem getting your to-do list items. Please relaunch and try again." + e)
  }
}
export const storeToDoItems = async (value: ToDoItem[] | null) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('todo-items', jsonValue);
  } catch (e) {
    alert("There was a problem saving your to-do list items. Please try again.");
  }
}
export const getTheme = async (set: (value: string) => void) => {
  try {
    const jsonValue = await AsyncStorage.getItem('theme');
    if (jsonValue == null) {
      set("#1bb16c");
    } else {
      set(JSON.parse(jsonValue as string))
    }
  } catch (e) {
    alert("There was a problem getting your theme. Please relaunch and try again.")
  }
}
export const storeTheme = async (value: string) => {
  try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('theme', jsonValue);
  } catch (e) {
      alert("There was a problem saving your theme. Please try again.");
  }
}