import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { useState } from "react";
import Tag from "./Tag";

type Tag = {
    primaryColor: string,
    secondaryColor: string,
    name: string,
    onPress: (tag: string) => void;
}
type Props = {
    onSelect: (tag: string) => void;
}
export default function TagSelector({onSelect}: Props) {
    const [tags] = useState<Tag[]>(
        [
            {
                primaryColor: "#ff0000",
                secondaryColor: "#ff9e9e",
                name: "red",
                onPress: () => {onSelect("red")}
            },
            {
                primaryColor: "#00ff00",
                secondaryColor: "#000",
                name: "green",
                onPress: () => {onSelect("green")}
            },
            {
                primaryColor: "#0000ff",
                secondaryColor: "#000",
                name: "blue",
                onPress: () => {onSelect("blue")}
            }
        ]
    )
    return (
        <View>
            <FlatList
                data={tags}
                contentContainerStyle={styles.listItems}
                scrollEnabled={true}
                renderItem={({ item }) => (
                    <Tag primaryColor={item.primaryColor} secondaryColor={item.secondaryColor} name={item.name} />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    listItems: {
        flexDirection: "row",
    }
})