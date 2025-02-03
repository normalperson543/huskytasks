import { View, StyleSheet, Text } from "react-native";
import SettingsItem from "@/components/SettingsItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNRestart from "react-native-restart";
import { useState } from "react";
import DeviceInfo from "react-native-device-info";
import ColorSelector from "@/components/ColorSelector";

type ToDoItem = {
    id: string, 
    name: string, 
    dateAdded: Date, 
    isChecked: boolean, 
    deleted: boolean, 
    tag: string,
    dueDate: string | undefined
}

export default function Settings() {
    const [settings, setSettings] = useState([]);
    const [color, setColor] = useState("");

    const [colors] = useState([
        "#20D782",
        "#C80000"

    ])
    const getSettings = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('settings');
          if (jsonValue == null) {
            setSettings([]);
          } else {
            setSettings(JSON.parse(jsonValue as string))
          }
        } catch (e) {
          alert("There was a problem getting your settings. Please relaunch and try again.")
        }
      }
    const storeToDoItems = async (value: ToDoItem[]) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('todo-items', jsonValue);
        } catch (e) {
            alert("There was a problem saving your to-do items. Please try again.");
        }
    }
    const storeSettings = async (value: any[]) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('settings', jsonValue);
        } catch (e) {
            alert("There was a problem saving your settings. Please try again.");
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Settings</Text>
            </View>
            <SettingsItem name="Reset app settings" description="This cannot be undone!" onClick={() => {storeToDoItems([]); RNRestart.restart();}} />
            {<SettingsItem name="About this app" description={`Huskytasks ${DeviceInfo.getVersion()}`} onClick={() => {alert(`Build ${DeviceInfo.getBuildNumber()}`)}} />}
            <ColorSelector colors={colors} selectedColor={color} onSelectColor={setColor} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: "column",
        backgroundColor: "#000"
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
})