import { Text, View } from "react-native";
import { useState } from 'react';
import ToDoItem from "@/components/ToDoItem";
import { Pressable } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import AddItemButton from "@/components/AddItemButton";
import { StyleSheet } from "react-native";
export default function Index() {
  const [toDoItems, setToDoItems] = useState<{id: number, name: string, isChecked: boolean}[]>([]);
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
     setToDoItems(newToDoItems as { id: number, name: string, isChecked: boolean }[]);
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
        isChecked: false
      }
    ]);
    return toDoItems.length;
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Huskytasks</Text>
        <AddItemButton addItem={() => addItem("some item")} />
      </View>
      <GestureHandlerRootView style={{flex: 1}}>
        <FlatList
          data={toDoItems}
          contentContainerStyle={styles.listItems}
          scrollEnabled={true}
          renderItem={({ item, index }) => (
            <ToDoItem title={item.name} isChecked={item.isChecked} setChecked={() => toggleChecked(index)}/>
          )}
        />
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "column"
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
  },
  listItems: {
    flexDirection: "column",
  }
})