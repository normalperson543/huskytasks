import { View, StyleSheet, Text } from "react-native";
import ColorSelectorItem from "./ColorSelectorItem";
type Props = {
    colors: string[],
    selectedColor: string,
    onSelectColor: (color: string) => void;
}
export default function ColorSelector({colors, selectedColor, onSelectColor}: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>Choose your theme</Text>
            <View style={styles.themeSelector}>
                {
                    colors.map((color: string) => 
                        <ColorSelectorItem color={color} onPress={() => onSelectColor(color)} selected={selectedColor == color} key={color}/>
                    )
                }
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 15,
        borderRadius: 10,
        backgroundColor: "#222",
        marginBottom: 10,
    },
    name: {
        fontWeight: "bold",
        flexGrow: 1,
        textAlign: "left",
        color: "#fff"
    },
    themeSelector: {
        flexDirection: "row"
    }
});