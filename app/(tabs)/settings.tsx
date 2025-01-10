import { View, StyleSheet, Text } from "react-native";
import SettingsItem from "@/components/SettingsItem";
export default function Settings() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Settings</Text>
            </View>
            <SettingsItem name="Reset app settings" description="This cannot be undone!" onClick={() => {}} />
            <SettingsItem name="About this app" description="Huskytasks 1.0.0" onClick={() => {}} />
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