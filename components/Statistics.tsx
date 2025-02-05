import { getTheme } from "@/utils/AsyncStorage";
import { useState } from "react";
import { View, StyleSheet, Text } from "react-native"
type Props = {
    totalTasks: number,
    incompleteTasks: number,
    completeTasks: number
}
export default function Statistics({totalTasks, incompleteTasks, completeTasks}: Props) {
    const [themeColor, setThemeColor] = useState("");
    
    getTheme(setThemeColor);

    return (
        <View style={[styles.container, {backgroundColor: themeColor}]}>
            <View style={styles.statisticContainer}>
                <Text style={styles.bigStatistic}>{totalTasks}</Text>
                <Text style={styles.statisticDesc}>total tasks</Text>
            </View>
            <View style={styles.statisticContainer}>
                <Text style={styles.bigStatistic}>{incompleteTasks}</Text>
                <Text style={styles.statisticDesc}>incompleted</Text>
            </View>
            <View style={styles.statisticContainer}>
                <Text style={styles.bigStatistic}>{completeTasks}</Text>
                <Text style={styles.statisticDesc}>completed</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 5,
        color: "#fff",
        flexDirection: "row",
        flexShrink: 1,
        marginBottom: 5,
    },
    statisticContainer: {
        flex: 1,
        flexDirection: "column",
    },
    bigStatistic: {
        color: "#fff",
        fontSize: 25,
        fontWeight: "bold",
        padding: 0
    },
    statisticDesc: {
        color: "#fff"
    }
})