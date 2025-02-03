import { View, TextInput, StyleSheet } from "react-native";


type Props = {
    searchString: string,
    onChange: (newSearchTerm: string) => void

}
export default function SearchBox({searchString, onChange}: Props) {
    return (
        <View style={styles.container}>
            <TextInput value={searchString} onChangeText={onChange}></TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "80%",
        
    }
})