import { PropsWithChildren } from "react";
import { Modal, KeyboardAvoidingView, StyleSheet, Text, View, Pressable } from "react-native"
import { MaterialIcons } from "@expo/vector-icons";
import TagSelector from "./TagSelector";
import AddItemModalButton from "./AddItemModalButton";
import { Calendar } from "react-native-calendars";

type Props = PropsWithChildren<{
    isVisible: boolean,
    onComplete: () => void,
    onChangeTag: (tag: string) => void,
    onClose: () => void,
    tag: string,
    dueDate: Date | null,
    onChangeDate: (date: Date) => void
}>

type RNCalendarDate = {
    dateString: string,
    day: number,
    month: number,
    timestamp: string,
    year: number
}
export default function AddItemModal({isVisible, onClose, children, onComplete, onChangeTag, tag, dueDate, onChangeDate}: Props) {
    return (
        <Modal animationType="slide" visible={isVisible} transparent={true}>
            <KeyboardAvoidingView behavior="padding" style={styles.modalContainer}>
                <View style={styles.heading}>
                    <Text style={styles.headingText}>What should the task be named?</Text>
                    <Pressable onPress={onClose}>
                        <MaterialIcons name="close" size={20} color="#fff" />
                    </Pressable>
                </View>
                {children}
                <Text style={styles.smallHeading}>Select a tag</Text>
                <TagSelector onSelect={onChangeTag} tag={tag}/>
                <Text style={styles.smallHeading}>When is this due?</Text>
                <Calendar onDayPress={(date: RNCalendarDate) => onChangeDate(new Date(date.timestamp))} markedDates={{[dueDate ? (dueDate as Date).toISOString().slice(0, 10) : ""]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}}}/>
                <AddItemModalButton onPress={onComplete} />
            </KeyboardAvoidingView>
        </Modal>
    )
}

export const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        width: "100%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: "#20d782",
        padding: 25,
        position: "absolute",
        bottom: 0,
    },
    heading: {
        flexDirection: "row"
    },
    headingText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10,
        flexGrow: 1
    },
    smallHeading: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10
    }
});