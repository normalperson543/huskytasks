import { View, StyleSheet, Text } from "react-native";
import SettingsItem from "@/components/SettingsItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNRestart from "react-native-restart";
//import DeviceInfo from "react-native-device-info";

export default function Settings() {
    const storeToDoItems = async (value: {id: string, name: string, dateAdded: Date, isChecked: boolean, deleted: boolean, tag: string}[]) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('todo-items', jsonValue);
        } catch (e) {
            alert("There was a problem saving your to-do list items. Please try again.");
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Settings</Text>
            </View>
            <SettingsItem name="Reset app settings" description="This cannot be undone!" onClick={() => {storeToDoItems([]); RNRestart.restart();}} />
            {/*<SettingsItem name="About this app" description={`Huskytasks ${DeviceInfo.getVersion()}`} onClick={() => {alert(`Build ${DeviceInfo.getBuildNumber()}`)}} />*/}
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