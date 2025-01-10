import { StyleSheet, Pressable, Text } from "react-native"

type Props = {
    name: string,
    description: string,
    onClick: () => void;
}

export default function SettingsItem({name, description, onClick}: Props) {
    return (
        <Pressable style={styles.container} onPress={onClick}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.description}>{description}</Text>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 15,
        borderRadius: 10,
        backgroundColor: "#222",
        marginBottom: 10
    },
    name: {
        fontWeight: "bold",
        flexGrow: 1,
        textAlign: "left",
        color: "#fff"
    },
    description: {
        flexGrow: 1,
        textAlign: "right",
        color: "#fff"
    }
});