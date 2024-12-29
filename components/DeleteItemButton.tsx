import { Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
type Props = {
    onClick: () => void
}

export default function DeleteItemButton({onClick}: Props) {
    return (
        <Pressable onPress={onClick} style={styles.button}>
            <MaterialIcons name="delete" size={20} color="#fff" />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 5,
        borderRadius: 10
    }
});