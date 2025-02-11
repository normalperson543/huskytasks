import { Modal, View, StyleSheet, Text } from "react-native";
import ToDoTaskItem from "./ToDoTaskItem";
import { useState } from "react";
import CompleteSetupModalButton from "./CompleteSetupModalButton";

type Props = {
    onComplete: () => void;
    themeColor: string;
    isVisible: boolean;
}

export default function FirstTimeModal({onComplete, themeColor, isVisible}: Props) {
    const [isChecked, setChecked] = useState(false);

    return (
        <Modal visible={isVisible} animationType="slide" transparent={true}>
            <View style={[styles.modalContainer, {backgroundColor: themeColor}]}>
                <Text style={styles.headingText}>Welcome to Huskytasks</Text>
                <View style={styles.heading}>
                    <View style={styles.circleWithNumber}><Text style={styles.bigNumber}>1</Text></View>
                    <Text style={styles.smallHeading}>Add a task</Text>
                </View>
                <Text style={styles.description}>Press the big add button on the top left corner of your device.</Text>
                <View style={styles.heading}>
                    <View style={styles.circleWithNumber}><Text style={styles.bigNumber}>2</Text></View>
                    <Text style={styles.smallHeading}>Check off a task</Text>
                </View>
                <Text style={styles.description}>Tap the checkbox to the left of the task in order to mark it completed. Try it below.</Text>
                <ToDoTaskItem isChecked={isChecked} title="Check me off!" setChecked={() => setChecked(!isChecked)} onDelete={() => {}} onEdit={() => {}} dueDate={null} theme={themeColor} tag="" deleted={false}/>
                <View style={styles.heading}>
                    <View style={styles.circleWithNumber}><Text style={styles.bigNumber}>3</Text></View>
                    <Text style={styles.smallHeading}>Customize your tasks</Text>
                </View>
                <Text style={styles.description}>There are many ways to customize your tasks. You can add colored tags when adding tasks, and sort them by selecting the tag color on the top of your screen.</Text>
                <Text style={styles.description}>Add due dates by clicking the due date in the calendar when adding your task, and see when tasks are due right from the task view.</Text>
                <CompleteSetupModalButton onPress={onComplete} />
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        width: "100%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 25,
        position: "absolute",
        bottom: 0,
        gap: 5
    },
    heading: {
        flexDirection: "column",
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
    },
    circleWithNumber: {
        padding: 10,
        borderRadius: 10000,
        backgroundColor: "#fff",
        width: 40,
        height: 40,
        marginRight: 10,
        verticalAlign: "middle",
        alignItems: "center",
    },
    bigNumber: {
        fontWeight: "bold",
        fontSize: 15
    },
    description: {
        color: "#fff"
    }
})