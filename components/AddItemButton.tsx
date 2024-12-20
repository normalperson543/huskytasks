import { Pressable, Text, StyleSheet } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
type Props = {
    addItem: () =>  void
}
export default function AddItemButton({addItem}: Props) {
    return (
        <Pressable onPress={addItem} style={styles.addItemBtn}>
            <MaterialIcons name="add" size={40} color="#000" />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    addItemBtn: {
        borderRadius: 10000,
        backgroundColor: "#20d782",
        padding: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
})