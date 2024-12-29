import { PropsWithChildren } from "react";
import { Modal, KeyboardAvoidingView, StyleSheet, Text } from "react-native"
import AddItemModalButton from "./AddItemModalButton";
type Props = PropsWithChildren<{
    isVisible: boolean,
    onComplete: () => void
}>
export default function AddItemModal({isVisible, children, onComplete}: Props) {
    return (
        <Modal animationType="slide" visible={isVisible} transparent={true}>
            <KeyboardAvoidingView behavior="padding" style={styles.modalContainer}>
                <Text>What should the task be named?</Text>
                {children}
                <AddItemModalButton onPress={onComplete} />
            </KeyboardAvoidingView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        width: "100%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: "#ddd",
        padding: 25,
        position: "absolute",
        bottom: 0
    }
});