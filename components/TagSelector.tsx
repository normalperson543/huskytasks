import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { useState } from "react";
import Tag from "./Tag";
import { isSearchBarAvailableForCurrentPlatform } from "react-native-screens";

type Tag = {
    primaryColor: string,
    secondaryColor: string,
    name: string,
    onPress: () => void;
}
type Props = {
    onSelect: (tag: string) => void,
    tag: string
}
export default function TagSelector({onSelect, tag}: Props) {
    const [tags] = useState<Tag[]>(
        [
            {
                primaryColor: "#f2f2f2",
                secondaryColor: "#fff",
                name: "no tag",
                onPress: () => {onSelect("")}
            },
            {
                primaryColor: "#ff0000",
                secondaryColor: "#ff9e9e",
                name: "red",
                onPress: () => {onSelect("red")}
            },
            {
                primaryColor: "#00ff00",
                secondaryColor: "#9eff9e",
                name: "green",
                onPress: () => {onSelect("green")}
            },
            {
                primaryColor: "#0000ff",
                secondaryColor: "#9e9eff",
                name: "blue",
                onPress: () => {onSelect("blue")}
            },
            {
                primaryColor: "#ff9933",
                secondaryColor: "#ffbf80",
                name: "orange",
                onPress: () => {onSelect("orange")}
            },
            {
                primaryColor: "#ffff00",
                secondaryColor: "#ffff9e",
                name: "yellow",
                onPress: () => {onSelect("yellow")}
            },
            {
                primaryColor: "#9933ff",
                secondaryColor: "#bf80ff",
                name: "purple",
                onPress: () => {onSelect("purple")}
            },
            {
                primaryColor: "#c2c2c2",
                secondaryColor: "#d9d9d9",
                name: "gray",
                onPress: () => {onSelect("gray")}
            }
        ]
    )
    
    let tagData = tags;
    let selectedTag = tagData.filter(tagFromData => tagFromData.name == tag)[0];
    let isSelectedTag = false;
    if (tag != "") {
        tagData = tagData.filter(tagFromData => tagFromData.name != tag); // filter shown tags so that the selected tag is not show;
        isSelectedTag = true;
    }
    return (
        <View style={styles.container}>
            {
                isSelectedTag &&
                <View style={styles.selectedTag}>
                    <Tag 
                        primaryColor={selectedTag.primaryColor} 
                        secondaryColor={selectedTag.secondaryColor} 
                        name={selectedTag.name} 
                        onPress={selectedTag.onPress} 
                    />
                </View>
            }
            <FlatList
                horizontal
                data={tagData}
                contentContainerStyle={styles.listItems}
                scrollEnabled={true}
                renderItem={({ item }) => (
                    <Tag 
                        primaryColor={item.primaryColor} 
                        secondaryColor={item.secondaryColor} 
                        name={item.name} 
                        onPress={item.onPress}
                    />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    selectedTag: {
        borderRightWidth: 2,
        borderRightColor: "#fff",
        marginRight: 5
    },
    listItems: {
        flexDirection: "row",
    }
})