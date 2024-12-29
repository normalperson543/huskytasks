import { StyleSheet, Pressable, Text } from "react-native"

type Props = {
    onPress: () => void
}
export default function AddItemModalButton({onPress}: Props) {
    return (
        <Pressable style={styles.addButton} onPress={onPress}><Text>Create a task</Text></Pressable>
    )
}
const styles = StyleSheet.create({
    addButton: {
        width: "80%",
        padding: 10,
        textAlign: "center",
        backgroundColor: "#20d782"
    }
})