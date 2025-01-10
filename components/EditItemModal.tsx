import { PropsWithChildren } from "react";
import { Modal, KeyboardAvoidingView, StyleSheet, Text } from "react-native"
import { MaterialIcons } from "@expo/vector-icons";

import EditItemModalButton from "./EditItemModalButton";
type Props = PropsWithChildren<{
    isVisible: boolean,
    onComplete: () => void,
    onChangeTag: (tag: string) => void
}>
export default function EditItemModal({isVisible, children, onComplete, onChangeTag}: Props) {
    return (
        <Modal animationType="slide" visible={isVisible} transparent={true}>
            <KeyboardAvoidingView behavior="padding" style={styles.modalContainer}>
                <Text style={styles.heading}>Edit this task</Text>
                {children}
                <EditItemModalButton onPress={onComplete} />
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
        fontSize: 30,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10
    }
});