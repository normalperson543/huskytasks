import { Pressable, Text, StyleSheet, StyleProp } from "react-native"

type Props = {
    onClick: () => void,
    text: string,
    theme: string
}
export default function SmallButton({onClick, text, theme}: Props) {
    return (
        <Pressable style={[styles.container, {backgroundColor: theme}]} onPress={onClick}>
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