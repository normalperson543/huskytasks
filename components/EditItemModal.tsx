import { PropsWithChildren } from "react";
import { Modal, KeyboardAvoidingView, StyleSheet, Text, View, Pressable } from "react-native"
import TagSelector from "./TagSelector";
import { MaterialIcons } from "@expo/vector-icons";
import EditItemModalButton from "./EditItemModalButton";
type Props = PropsWithChildren<{
    isVisible: boolean,
    onComplete: () => void,
    onChangeTag: (tag: string) => void,
    onClose: () => void,
    tag: string
}>
export default function EditItemModal({isVisible, onClose, children, onComplete, onChangeTag, tag}: Props) {
    return (
        <Modal animationType="slide" visible={isVisible} transparent={true}>
            <KeyboardAvoidingView behavior="padding" style={styles.modalContainer}>
            <View style={styles.heading}>
                    <Text style={styles.headingText}>Edit this task</Text>
                    <Pressable onPress={onClose}>
                        <MaterialIcons name="close" size={20} color="#fff" />
                    </Pressable>
                </View>
                {children}
                <Text style={styles.smallHeading}>Change the tag</Text>
                <TagSelector onSelect={onChangeTag} tag={tag}/>
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