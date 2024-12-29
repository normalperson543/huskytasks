import { Text, View } from "react-native";
import { useState, useEffect } from 'react';
import ToDoItem from "@/components/ToDoItem";
import { Pressable } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import AddItemButton from "@/components/AddItemButton";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native";
import AddItemModal from "@/components/AddItemModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Index() {
  const [toDoItems, setToDoItems] = useState<{id: number, name: string, isChecked: boolean, deleted: boolean}[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [toDoModalValue, setToDoModalValue] = useState("");
  const getToDoItems = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('todo-items');
      console.log(jsonValue);
      setToDoItems(jsonValue != null ? JSON.parse(jsonValue) : null)
    } catch (e) {
      alert("There was a problem getting your to-do list items. Please relaunch and try again.")
    }
  }
  const storeToDoItems = async (value: {id: number, name: string, isChecked: boolean, deleted: boolean}[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('todo-items', jsonValue);
    } catch (e) {
      alert("There was a problem saving your to-do list items. Please try again.");
    }
  }
  function toggleChecked(id: number) {
     const newToDoItems = toDoItems.map((item) => {
      if (item.id == id) {
        return {
          ...item,
          isChecked: !item.isChecked
        };
      } else return item;
     })
     console.log(newToDoItems);
     setToDoItems(newToDoItems as { id: number, name: string, isChecked: boolean, deleted: boolean}[]);
  }
  function isChecked(id: number) {
    return toDoItems[id].isChecked;
  }
  function addItem(name: string) {
    setToDoItems([
      ...toDoItems,
      {
        id: toDoItems.length,
        name: name,
        isChecked: false,
        deleted: false
      }
    ]);
    setModalVisible(false);
    storeToDoItems(toDoItems);
    return toDoItems.length;
  }
  function deleteItem(id: number) {
    const newToDoItems = toDoItems.map((item) => {
      if (item.id == id) {
        return {
          ...item,
          deleted: true
        };
      } else return item;
     })
     setToDoItems(newToDoItems as { id: number, name: string, isChecked: boolean, deleted: boolean}[]);
     storeToDoItems(toDoItems);
  }

  useEffect(() => {
    getToDoItems();
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Huskytasks</Text>
        <AddItemButton addItem={() => setModalVisible(true)} />
      </View>
      <Pressable onPress={() => storeToDoItems(toDoItems)}><Text style={styles.text}>Save it!</Text></Pressable>
      <GestureHandlerRootView style={{flex: 1}}>
        <View style={styles.toDoView}>
          <Text style={[styles.text, styles.secondaryHeaderText]}>To Do</Text>
          <FlatList
            data={toDoItems.filter(item => !item.isChecked)}
            contentContainerStyle={styles.listItems}
            scrollEnabled={true}
            renderItem={({ item }) => (
              <ToDoItem title={item.name} isChecked={item.isChecked} deleted={item.deleted} setChecked={() => toggleChecked(item.id)} onDelete={() => deleteItem(item.id)}/>
            )}
          />
        </View>
        <View style={styles.doneView}>
          <Text style={[styles.text, styles.secondaryHeaderText]}>Done</Text>
          <FlatList
            data={toDoItems.filter(item => item.isChecked)}
            contentContainerStyle={styles.listItems}
            scrollEnabled={true}
            renderItem={({ item }) => (
              <ToDoItem title={item.name} isChecked={item.isChecked} deleted={item.deleted} setChecked={() => toggleChecked(item.id)} onDelete={() => deleteItem(item.id)}/>
            )}
          />
        </View>
      </GestureHandlerRootView>
      <AddItemModal isVisible={modalVisible} onComplete={() => addItem(toDoModalValue)}>
        <TextInput
          style={styles.modalTextInput}
          onChangeText={setToDoModalValue}
          value={toDoModalValue}
        />
      </AddItemModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "column",
    backgroundColor: "#000"
  },
  text: {
    color: "#fff",
  },
  header: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 30,
    flexGrow: 1,
    color: "#fff"
  },
  secondaryHeaderText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  listItems: {
    flexDirection: "column",
    height: "auto"
  },
  modalTextInput: {
    padding: 5,
    borderWidth: 1,
    borderColor: "#999",
    height: 25,
    width: "80%"
  },
  toDoView: {
    flex: 1,
    flexDirection: "column",
    width: "100%"
  },
  doneView: {
    flex: 1,
    flexDirection: "column",
    width: "100%"
  }
})