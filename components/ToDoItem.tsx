import { View } from "react-native";
import ItemCheckbox from "@/components/ItemCheckbox";

type Props = {
    title: string;
    isChecked: boolean;
    setChecked: () => void;
}

export default function ToDoItem({isChecked, title, setChecked}: Props) {
    return (
        <View style={{flex: 1}}>
            <ItemCheckbox  title={title} isChecked={isChecked} onValueChange={() => {setChecked()}}/>
        </View>
    )
}