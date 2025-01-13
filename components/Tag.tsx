import { View, Pressable, StyleSheet, Text } from "react-native";

type Props = {
    primaryColor: string,
    secondaryColor: string,
    name: string,
    onPress: () => void;
}
export default function Tag({primaryColor, secondaryColor, name, onPress}: Props) {
    return (
        <Pressable style={[styles.container, {borderColor: primaryColor, backgroundColor: secondaryColor}]} onPress={onPress}>
            <Text style={styles.name}>{name}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 100,
        padding: 5,
        borderWidth: 2,
        width: 60,
        marginRight: 10
    },
    name: {
        color: "#000",
        textAlign: "center"
    }
})