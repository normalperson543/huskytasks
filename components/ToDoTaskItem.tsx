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
    theme: string
}


export default function ToDoTaskItem({isChecked, title, setChecked, onDelete, onEdit, tag, dueDate, theme}: Props) {
    const today = new Date();
    console.log("ejgor")
    console.log(dueDate == null);

    let dueDateElement;
    if (dueDate && dueDate != null) {
        if (dueDate.toISOString().slice(0, 10) === today.toISOString().slice(0, 10)) {
            dueDateElement = <Text style={styles.dueNow}>Due {dueDate.toISOString().slice(0, 10)}</Text>;
        } else if (today > (dueDate as Date)) {
            dueDateElement = <Text style={styles.pastDue}>Due {(dueDate as Date).toISOString().slice(0, 10)}</Text>;
        } else {
            dueDateElement = <Text style={styles.dueDate}>Due {(dueDate as Date).toISOString().slice(0, 10)}</Text>
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.toDoItem}>
                <ItemCheckbox  title={title} isChecked={isChecked} onValueChange={() => {setChecked()}} onClick={onEdit} color={tag} theme={theme}/>
                <DeleteItemButton onClick={onDelete} />
            </View>
            {dueDateElement}
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