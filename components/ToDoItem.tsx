import { View, StyleSheet, Text } from "react-native";
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
    dueDate: Date | null;
}


export default function ToDoItem({isChecked, title, setChecked, onDelete, onEdit, tag, dueDate}: Props) {
    const today = new Date();
    return (
        <View style={styles.container}>
            <View style={styles.toDoItem}>
                <ItemCheckbox  title={title} isChecked={isChecked} onValueChange={() => {setChecked()}} onClick={onEdit} color={tag}/>
                <DeleteItemButton onClick={onDelete} />
            </View>
            {dueDate &&
            dueDate.toISOString().slice(0, 10) === today.toISOString().slice(0, 10) ?  <Text style={styles.dueNow}>Due {dueDate.toISOString().slice(0, 10)}</Text> : today > (dueDate as Date) ? <Text style={styles.pastDue}>Due {(dueDate as Date).toISOString().slice(0, 10)}</Text> : <Text style={styles.dueDate}>Due {(dueDate as Date).toISOString().slice(0, 10)}</Text>}
        </View>
        
    )
}
const styles = StyleSheet.create({
    toDoItem: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    container: {
        flexDirection: "column"
    },
    dueDate: {
        color: "#999"
    },
    dueNow: {
        color: "#ff9900"
    },
    pastDue: {
        color: "#ff0000"
    }
})