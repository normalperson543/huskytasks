import { View, StyleSheet, Text } from "react-native";
import ItemCheckbox from "@/components/ItemCheckbox";
import DeleteItemButton from "./DeleteItemButton";
import stringifyDate from "@/utils/dateStringify";
type Props = {
    title: string;
    isChecked: boolean;
    deleted: boolean;
    setChecked: () => void;
    onDelete: () => void;
    onEdit: () => void;
    tag: string;
    dueDate: Date | null;
    theme: string
}


export default function ToDoTaskItem({isChecked, title, setChecked, onDelete, onEdit, tag, dueDate, theme}: Props) {
    const today = new Date();
    console.log("Today");
    console.log(today);

    const dueDateString = stringifyDate(dueDate);
    const todayDateString = today.toISOString().slice(0, 10);
    
    return (
        <View style={styles.container}>
            <View style={styles.toDoItem}>
                <ItemCheckbox  title={title} isChecked={isChecked} onValueChange={() => {setChecked()}} onClick={onEdit} color={tag} theme={theme}/>
                <DeleteItemButton onClick={onDelete} />
            </View>
            {dueDate && <Text style={styles.dueDate}>Due {dueDateString}</Text>}
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