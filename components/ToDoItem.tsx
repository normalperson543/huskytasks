import { View, StyleSheet } from "react-native";
import ItemCheckbox from "@/components/ItemCheckbox";
import DeleteItemButton from "./DeleteItemButton";
type Props = {
    title: string;
    isChecked: boolean;
    deleted: boolean;
    setChecked: () => void;
    onDelete: () => void;
    onEdit: () => void;
    tag: string;
}

export default function ToDoItem({isChecked, title, deleted, setChecked, onDelete, onEdit, tag}: Props) {
    if (deleted) return;
    return (
        <View style={styles.toDoItem}>
            <ItemCheckbox  title={title} isChecked={isChecked} onValueChange={() => {setChecked()}} onClick={onEdit}/>
            <DeleteItemButton onClick={onDelete} />
        </View>
    )
}
const styles = StyleSheet.create({
    toDoItem: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    }
})