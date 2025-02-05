import { Pressable, Text, StyleSheet } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

type Props = {
    addItem: () =>  void,
    theme: string
}
export default function AddItemButton({addItem, theme}: Props) {
    return (
        <Pressable onPress={addItem} style={[styles.addItemBtn, {backgroundColor: theme}]}>
            <MaterialIcons name="add" size={40} color="#fff" />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    addItemBtn: {
        borderRadius: 10000,
        padding: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
})