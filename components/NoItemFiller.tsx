import { View, Text, StyleSheet } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

type Props = {
    text: string
}

export default function NoItemFiller({text}: Props) {
    return (
        <View style={styles.container}>
            <MaterialIcons name="done-all" color="#999" size={60} />
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 40
    },
    text: {
        color: "#999"
    }
})