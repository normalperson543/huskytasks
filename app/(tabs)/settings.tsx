import { View, StyleSheet, Text } from "react-native";
import SettingsItem from "@/components/SettingsItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNRestart from "react-native-restart";
import { useState } from "react";
import DeviceInfo from "react-native-device-info";
import ColorSelector from "@/components/ColorSelector";
import { getTheme, storeTheme, storeToDoItems } from "@/utils/AsyncStorage";
import FirstTimeModal from "@/components/FirstTimeModal";

export default function Settings() {
    const [color, setColor] = useState("");
    const [firstTimeModalVisible, setFirstTimeModalVisible] = useState(false);
    const [colors] = useState([
        "#1bb16c",
        "#C80000"
    ])

    function onSetColor(color: string) {
        setColor(color);
        storeTheme(color);
        getTheme(setColor);
        RNRestart.restart();
    }

    function reset() {
        AsyncStorage.clear();
        RNRestart.restart();
    }

    getTheme(setColor);
   
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Settings</Text>
            </View>
            <ColorSelector colors={colors} selectedColor={color} onSelectColor={onSetColor} />
            <SettingsItem name="Open first time help" description="" onClick={() => {setFirstTimeModalVisible(true)}} />
            <SettingsItem name="About this app" description={`Huskytasks ${DeviceInfo.getVersion()}`} onClick={() => {alert(`Build ${DeviceInfo.getBuildNumber()}`)}} />
            <SettingsItem name="Reset app settings" description="This cannot be undone!" onClick={reset} />
            <FirstTimeModal onComplete={() => setFirstTimeModalVisible(false)} themeColor={color} isVisible={firstTimeModalVisible} />
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