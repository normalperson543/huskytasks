import { View, TextInput, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"

type Props = {
    theme: string,
    searchString: string,
    onChange: (searchString: string) => void;
}
export default function SearchBox({searchString, onChange, theme}: Props) {
    return (
        <View style={[styles.container, {borderColor: theme}]}>
            <MaterialIcons name="search" size={25} color="#fff" />
            <TextInput value={searchString} onChangeText={onChange} style={styles.input}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 100,
        borderWidth: 2,
        padding: 5,
        height: 35,
        marginTop: 10,
        marginBottom: 10,
        flexDirection: "row"
    },
    input: {
        flexGrow: 1,
        color: "#fff"
    }
})