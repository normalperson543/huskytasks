import { StyleSheet, Pressable, Text } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

type Props = {
    onPress: () => void
}
export default function AddItemModalButton({onPress}: Props) {
    return (
        <Pressable style={styles.addButton} onPress={onPress}>
            <MaterialIcons name="add" size={20} color="#000" style={styles.addIcon}/>
            <Text style={styles.text}>Create a task</Text>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    addButton: {
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 9999,
        marginBottom: 40,
        marginTop: 20,
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
    },
    text: {
        fontWeight: "bold",
        verticalAlign: "middle"
    },
    addIcon: {
        marginRight: 10,
        verticalAlign: "middle"
    }
})