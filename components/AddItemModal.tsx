import { PropsWithChildren } from "react";
import { Modal, KeyboardAvoidingView, StyleSheet, Text, View, Pressable } from "react-native"
import { MaterialIcons } from "@expo/vector-icons";
import TagSelector from "./TagSelector";
import AddItemModalButton from "./AddItemModalButton";
import { Calendar } from "react-native-calendars";
import stringifyDate from "@/utils/dateStringify";
import NextStepModalButton from "./NextStepModalButton";

type Props = PropsWithChildren<{
    isVisible: boolean,
    onComplete: () => void,
    onChangeTag: (tag: string) => void,
    onClose: () => void,
    tag: string,
    dueDate: Date | null,
    onChangeDate: (date: Date) => void,
    theme: string,
    step: number,
    onNextStep: () => void;
}>

type RNCalendarDate = {
    dateString: string,
    day: number,
    month: number,
    timestamp: string,
    year: number,
}
export default function AddItemModal({isVisible, onClose, children, onComplete, onChangeTag, tag, dueDate, onChangeDate, theme, step, onNextStep}: Props) {
    return (
        <Modal animationType="slide" visible={isVisible} transparent={true}>
            <KeyboardAvoidingView behavior="padding" style={[styles.modalContainer, {backgroundColor: theme}]}>
                <View style={styles.closeIcon}>
                    <Pressable onPress={onClose}>
                        <MaterialIcons name="close" size={20} color="#fff" />
                    </Pressable>
                </View>
                {step == 1 && <>
                    <View style={styles.heading}>
                        <Text style={styles.headingText}>What should the task be named?</Text>
                    </View>
                    {children}
                    <NextStepModalButton onPress={onNextStep} />
                    <AddItemModalButton onPress={onComplete} />
                </>
                }
                {step == 2 && <>
                    <Text style={styles.smallHeading}>Select a tag</Text>
                    <TagSelector onSelect={onChangeTag} tag={tag}/>
                    <Text style={styles.smallHeading}>When is this due?</Text>
                    <Calendar onDayPress={(date: RNCalendarDate) => onChangeDate(new Date(date.timestamp))} markedDates={{[stringifyDate(dueDate)]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}}}/>
                    <AddItemModalButton onPress={onComplete} />
                </>
                }
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
        padding: 25,
        position: "absolute",
        bottom: 0,
    },
    heading: {
        flexDirection: "row",
        width: "90%"
    },
    closeIcon: {
        position: "absolute",
        top: 20,
        right: 20,
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
        marginBottom: 10,
        width: "90%"
    }
});