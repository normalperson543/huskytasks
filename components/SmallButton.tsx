import { Pressable, Text, StyleSheet, StyleProp } from "react-native"

type Props = {
    onClick: () => void,
    text: string
}
export default function SmallButton({onClick, text}: Props) {
    return (
        <Pressable style={styles.container} onPress={onClick}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        backgroundColor: "#20d782",
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: "#fff",
        fontWeight: "bold"
    }
})