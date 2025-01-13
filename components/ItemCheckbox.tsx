//https://docs.expo.dev/versions/latest/sdk/checkbox/
import Checkbox from 'expo-checkbox';
import { StyleSheet, Text, View, Pressable } from 'react-native';

type Props = {
    title: string;
    isChecked: boolean;
    onValueChange: () => void;
    onClick: () => void;
    color: string;
}
export default function ItemCheckbox({title, isChecked, onValueChange, onClick, color}: Props) {
  console.log("BEEP")
  console.log(color);
  return (
    <View style={styles.section}>
      <Checkbox style={styles.checkbox} value={isChecked} onValueChange={onValueChange} />
      <Pressable style={[{borderColor: color ? color : "#20d782"}, styles.innerContainer]} onPress={onClick}>
        {color && <View style={[{backgroundColor: color}, styles.circle]}></View>}
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
    flexDirection: "row",
    alignItems: "center",
    fontSize: 15,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    flexGrow: 1
  },
  text: {
    color: "#fff"
  },
  checkbox: {
    margin: 8,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 10000000,
    marginRight: 10
  }
});
