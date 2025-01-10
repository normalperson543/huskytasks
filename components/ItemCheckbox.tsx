//https://docs.expo.dev/versions/latest/sdk/checkbox/
import Checkbox from 'expo-checkbox';
import { StyleSheet, Text, View, Pressable } from 'react-native';

type Props = {
    title: string;
    isChecked: boolean;
    onValueChange: () => void;
    onClick: () => void;
}
export default function ItemCheckbox({title, isChecked, onValueChange, onClick}: Props) {

  return (
    <View style={styles.section}>
      <Checkbox style={styles.checkbox} value={isChecked} onValueChange={onValueChange} />
      <Pressable style={styles.innerContainer} onPress={onClick}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12
  },
  innerContainer: {
    fontSize: 15,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#20d782",
    padding: 10,
    flexGrow: 1
  },
  text: {
    color: "#fff"
  },
  checkbox: {
    margin: 8,
  },
});
