import { Text, View } from "react-native";
import { useState, useEffect } from 'react';
import ToDoItem from "@/components/ToDoItem";
import { Pressable } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import AddItemButton from "@/components/AddItemButton";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native";
import AddItemModal from "@/components/AddItemModal";
import EditItemModal from "@/components/EditItemModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Statistics from "@/components/Statistics";
import uuid from "react-native-uuid";
import { ScrollView } from "react-native-gesture-handler";
import NoItemFiller from "@/components/NoItemFiller";
import SmallButton from "@/components/SmallButton";
import TagSelector from "@/components/TagSelector";

export default function Index() {
  const [toDoItems, setToDoItems] = useState<{id: string, name: string, dateAdded: Date, isChecked: boolean, deleted: boolean, tag: string}[]>([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentEdit, setCurrentEdit] = useState("");
  const [toDoModalValue, setToDoModalValue] = useState("");
  const [tag, setTag] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [init, setInit] = useState(false);

  const getToDoItems = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('todo-items');
      console.log(jsonValue);
      if (jsonValue == null) {
        setToDoItems([]);
        storeToDoItems([]);
      } else {
        setToDoItems(JSON.parse(jsonValue as string))
      }
    } catch (e) {
      alert("There was a problem getting your to-do list items. Please relaunch and try again.")
    }
  }
  const storeToDoItems = async (value: {id: string, name: string, dateAdded: Date, isChecked: boolean, deleted: boolean, tag: string}[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('todo-items', jsonValue);
    } catch (e) {
      alert("There was a problem saving your to-do list items. Please try again.");
    }
  }
  function toggleChecked(id: string) {
     const newToDoItems = toDoItems.map((item) => {
      if (item.id == id) {
        return {
          ...item,
          isChecked: !item.isChecked
        };
      } else return item;
     })
     console.log(newToDoItems);
     setToDoItems(newToDoItems as { id: string, name: string, dateAdded: Date, isChecked: boolean, deleted: boolean, tag: string}[]);
  }
  function addItem(name: string) {
    const generatedUUID = uuid.v4();
    setToDoItems([
      ...toDoItems,
      {
        id: generatedUUID,
        name: name,
        dateAdded: new Date(),
        isChecked: false,
        deleted: false,
        tag: tag
      }
    ]);
    setAddModalVisible(false);
    console.log(toDoItems);
    return toDoItems.length;
  }
  function deleteItem(id: string) {
    const newToDoItems = toDoItems.filter((item) => item.id != id)
    console.log(newToDoItems);
     setToDoItems(newToDoItems as { id: string, name: string, dateAdded: Date, isChecked: boolean, deleted: boolean, tag: string}[]);
  }
  function editItem(name: string, tag: string) {
    //https://react.dev/learn/updating-arrays-in-state#replacing-items-in-an-array
    const id = currentEdit;
    const nextToDoItems = toDoItems.map((item, index) => {
      if (item.id == id) {
        return {
          ...item,
          name: name,
          tag: tag
        }
      } else {
        return item;
      }
    })
    setToDoItems(nextToDoItems);
    setEditModalVisible(false);
  }
  function compareItems(val1: { id: string, name: string, dateAdded: Date, isChecked: boolean, deleted: boolean, tag: string}, val2: { id: string, name: string, dateAdded: Date, isChecked: boolean, deleted: boolean, tag: string}) {
    const date1 = new Date(val1.dateAdded);
    const date2 = new Date(val2.dateAdded);
    return date2.getTime() - date1.getTime();
  }
  function changeTag(newTag: string) {
    console.log(newTag);
    setTag(newTag);
  }
  function deleteAllDoneTasks() {
    if (filterTag == "") {
      setToDoItems(toDoItems.filter(item => !item.isChecked));
    } else {
      setToDoItems(toDoItems.filter(item => !(item.isChecked && item.tag == filterTag)));
    }
  }
  useEffect(() => {
    getToDoItems();
    if (toDoItems == null) {
      storeToDoItems([]);
      getToDoItems();
    }
    setInit(true);
  }, [init])

  useEffect(() => {
    let ignore = false;
    const save = async () => {
      try {
        let fetchedItems;
        const jsonValue = await AsyncStorage.getItem('todo-items');
        if (!ignore && init) {
          fetchedItems = jsonValue != null ? JSON.parse(jsonValue) : null
          if (fetchedItems != JSON.stringify(toDoItems)) {
            console.log("Testings")
            const jsonValue2 = JSON.stringify(toDoItems);
            await AsyncStorage.setItem('todo-items', jsonValue2);
          }
        }
      } catch (e) {
        alert("There was a problem syncing your to-do list items. Please relaunch and try again.")
      }
    }
    save();
    return () => {
      ignore = true;
    };
  }, [toDoItems, init])
  
  let toDoRenderItems = toDoItems.filter(item => !item.isChecked);
  let doneRenderItems = toDoItems.filter(item => item.isChecked);
  if (filterTag != "") {
    console.log("HELLO")
    toDoRenderItems = toDoRenderItems.filter(item => item.tag == filterTag);
    doneRenderItems = doneRenderItems.filter(item => item.tag == filterTag);
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Huskytasks</Text>
        <AddItemButton addItem={() => {setTag(""); setAddModalVisible(true);}} />
      </View>
      <Statistics totalTasks={toDoItems.length} incompleteTasks={toDoItems.filter(item => !item.isChecked).length} completeTasks={toDoItems.filter(item => item.isChecked).length} />
      <GestureHandlerRootView style={{flex: 1}}>
        <TagSelector onSelect={setFilterTag} tag={filterTag}/>
        <ScrollView>
          <View style={styles.toDoView}>
            <Text style={[styles.text, styles.secondaryHeaderText]}>To Do</Text>
            {toDoRenderItems.length == 0 ? <NoItemFiller text="You're all caught up"/> : 
             toDoRenderItems.sort(compareItems).map((item) => 
                <ToDoItem 
                  title={item.name} 
                  isChecked={item.isChecked} 
                  deleted={item.deleted} 
                  setChecked={() => toggleChecked(item.id)} 
                  onDelete={() => deleteItem(item.id)}
                  onEdit={() => {setCurrentEdit(item.id); setTag(item.tag); setEditModalVisible(true);}}
                  tag={item.tag}
                  key={item.id}
                />)
            }
          </View>
          <View style={styles.doneView}>
            <View style={styles.smallHeadingContainer}>
              <Text style={[styles.text, styles.secondaryHeaderText]}>Done</Text>
              {doneRenderItems.length != 0 &&
                <SmallButton onClick={deleteAllDoneTasks} text="Clear" />
              }
            </View>
            
            {doneRenderItems.length == 0 ? <NoItemFiller text="Let's accomplish something meaningful"/> : 
              doneRenderItems.sort(compareItems).map((item) => 
                <ToDoItem 
                  title={item.name} 
                  isChecked={item.isChecked} 
                  deleted={item.deleted} 
                  setChecked={() => toggleChecked(item.id)} 
                  onDelete={() => deleteItem(item.id)}
                  onEdit={() => {setCurrentEdit(item.id); setTag(item.tag); setEditModalVisible(true);}}
                  tag={item.tag}
                  key={item.id}
                />)
            }
          </View>
        </ScrollView>
      </GestureHandlerRootView>
      <AddItemModal isVisible={addModalVisible} onComplete={() => addItem(toDoModalValue)} onChangeTag={changeTag} onClose={() => setAddModalVisible(false)} tag={tag}>
        <TextInput
          style={[{borderColor: tag != "" ? tag : "light-blue"}, styles.modalTextInput]} 
          onChangeText={setToDoModalValue}
          value={toDoModalValue}
        />
      </AddItemModal>
      <EditItemModal isVisible={editModalVisible} onComplete={() => editItem(toDoModalValue, tag)} onChangeTag={changeTag} onClose={() => setEditModalVisible(false)} tag={tag}>
        <TextInput
          style={[{borderColor: tag != "" ? tag : "light-blue"}, styles.modalTextInput]}
          onChangeText={setToDoModalValue}
          value={toDoModalValue}
        />
      </EditItemModal>
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
    flexGrow: 1
  },
  listItems: {
    flexDirection: "column",
    height: "auto"
  },
  modalTextInput: {
    padding: 5,
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: "#eee",
    height: 40,
    marginBottom: 10,
    textAlign: "center"
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
  },
  smallHeadingContainer: {
    flexDirection: "row",
    alignItems: "center"
  }
})