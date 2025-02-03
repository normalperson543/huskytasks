import { View, Pressable, StyleSheet, Text } from "react-native";

type Props = {
    color: string,
    onPress: () => void,
    selected: boolean
}
export default function ColorSelectorItem({color, onPress, selected}: Props) {
    return (
        <Pressable onPress={onPress}>
            <View style={[styles.container, {backgroundColor: color}]} >
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10000000,
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: "#fff",
        marginLeft: 5
    }
})