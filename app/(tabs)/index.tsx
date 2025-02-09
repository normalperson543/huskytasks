import { Text, View } from "react-native";
import { useState, useEffect } from 'react';
import ToDoTaskItem from "@/components/ToDoTaskItem";
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
import { ToDoItem } from "@/utils/types";
import { getTheme, getToDoItems, storeToDoItems } from "@/utils/AsyncStorage";
import SearchBox from "@/components/SearchBox";
import FirstTimeModal from "@/components/FirstTimeModal";

export default function Index() {
  const [toDoItems, setToDoItems] = useState<ToDoItem[]>([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentEdit, setCurrentEdit] = useState("");
  const [toDoModalValue, setToDoModalValue] = useState("");
  const [tag, setTag] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [init, setInit] = useState(false);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [themeColor, setThemeColor] = useState("");
  const [searchString, setSearchString] = useState("");
  const [firstTimeModalVisible, setFirstTimeModalVisible] = useState(false);

  getTheme(setThemeColor);
  
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
     setToDoItems(newToDoItems as ToDoItem[]);
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
        tag: tag,
        dueDate: dueDate
      }
    ]);
    setAddModalVisible(false);
    console.log(toDoItems);
    return toDoItems.length;
  }
  function deleteItem(id: string) {
    const newToDoItems = toDoItems.filter((item) => item.id != id)
    console.log(newToDoItems);
     setToDoItems(newToDoItems as ToDoItem[]);
  }
  function editItem(name: string, tag: string) {
    //https://react.dev/learn/updating-arrays-in-state#replacing-items-in-an-array
    const id = currentEdit;
    const nextToDoItems = toDoItems.map((item, index) => {
      if (item.id == id) {
        return {
          ...item,
          name: name,
          tag: tag,
          dueDate: dueDate
        }
      } else {
        return item;
      }
    })
    setToDoItems(nextToDoItems);
    setEditModalVisible(false);
  }
  function compareItems(val1: ToDoItem, val2: ToDoItem) {
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
  function addButtonEvent() {
    setTag("");
    setToDoModalValue("");
    setDueDate(null);
    setAddModalVisible(true);
  }
  function editButtonEvent(item: ToDoItem) {
    setToDoModalValue(item.name);
    setCurrentEdit(item.id); 
    setTag(item.tag); 
    setDueDate(item.dueDate)
    setEditModalVisible(true);
  }
  useEffect(() => {
    getToDoItems(setToDoItems, () => setFirstTimeModalVisible(true));
    if (toDoItems == null) {
      //trigger 1st time setup
      storeToDoItems([]);
      getToDoItems(setToDoItems, () => setFirstTimeModalVisible(true));
      setFirstTimeModalVisible(true);
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
  
  let searchFilterToDoItems = toDoItems;
  if (searchString.length > 0) {
    searchFilterToDoItems = toDoItems.filter(item => item.name.toLowerCase().includes(searchString.toLowerCase()));
  }

  let toDoRenderItems = searchFilterToDoItems.filter(item => !item.isChecked);
  let doneRenderItems = searchFilterToDoItems.filter(item => item.isChecked);
  if (filterTag != "") {
    console.log("HELLO")
    toDoRenderItems = searchFilterToDoItems.filter(item => item.tag == filterTag);
    doneRenderItems = searchFilterToDoItems.filter(item => item.tag == filterTag);
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Huskytasks</Text>
        <AddItemButton addItem={addButtonEvent} theme={themeColor}/>
      </View>
      <Statistics totalTasks={toDoItems.length} incompleteTasks={toDoItems.filter(item => !item.isChecked).length} completeTasks={toDoItems.filter(item => item.isChecked).length} />
      <GestureHandlerRootView style={{flex: 1}}>
        <SearchBox searchString={searchString} onChange={setSearchString} theme={themeColor} />
        <TagSelector onSelect={setFilterTag} tag={filterTag}/>
        <ScrollView>
          <View style={styles.toDoView}>
            <Text style={[styles.text, styles.secondaryHeaderText]}>To Do</Text>
            {toDoRenderItems.length == 0 ? <NoItemFiller text={searchString.length <= 0 ? "You're all caught up" : "No results found."}/> : 
             toDoRenderItems.sort(compareItems).map((item) => 
                <ToDoTaskItem 
                  title={item.name} 
                  isChecked={item.isChecked} 
                  deleted={item.deleted} 
                  setChecked={() => toggleChecked(item.id)} 
                  onDelete={() => deleteItem(item.id)}
                  onEdit={() => {editButtonEvent(item)}}
                  tag={item.tag}
                  key={item.id}
                  dueDate={item.dueDate}
                  theme={themeColor}
                />)
            }
          </View>
          <View style={styles.doneView}>
            <View style={styles.smallHeadingContainer}>
              <Text style={[styles.text, styles.secondaryHeaderText]}>Done</Text>
              {doneRenderItems.length != 0 &&
                <SmallButton onClick={deleteAllDoneTasks} text="Clear" theme={themeColor} />
              }
            </View>
            
            {doneRenderItems.length == 0 ? <NoItemFiller text={searchString.length <= 0 ? "Let's accomplish something meaningful" : "No results found."}/> : 
              doneRenderItems.sort(compareItems).map((item) => 
                <ToDoTaskItem 
                  title={item.name} 
                  isChecked={item.isChecked} 
                  deleted={item.deleted} 
                  setChecked={() => toggleChecked(item.id)} 
                  onDelete={() => deleteItem(item.id)}
                  onEdit={() => {editButtonEvent(item)}}
                  tag={item.tag}
                  key={item.id}
                  dueDate={item.dueDate}
                  theme={themeColor}
                />)
            }
          </View>
        </ScrollView>
      </GestureHandlerRootView>
      <AddItemModal isVisible={addModalVisible} onComplete={() => addItem(toDoModalValue)} onChangeTag={changeTag} onClose={() => setAddModalVisible(false)} tag={tag} dueDate={dueDate} onChangeDate={setDueDate} theme={themeColor}>
        <TextInput
          style={[{borderColor: tag != "" ? tag : "light-blue"}, styles.modalTextInput]} 
          onChangeText={setToDoModalValue}
          value={toDoModalValue}
        />
      </AddItemModal>
      <EditItemModal isVisible={editModalVisible} onComplete={() => editItem(toDoModalValue, tag)} onChangeTag={changeTag} onClose={() => setEditModalVisible(false)} tag={tag} dueDate={dueDate} onChangeDate={setDueDate} theme={themeColor}>
        <TextInput
          style={[{borderColor: tag != "" ? tag : "light-blue"}, styles.modalTextInput]}
          onChangeText={setToDoModalValue}
          value={toDoModalValue}
        />
      </EditItemModal>
      <FirstTimeModal onComplete={() => setFirstTimeModalVisible(false)} themeColor={themeColor} isVisible={firstTimeModalVisible} />
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