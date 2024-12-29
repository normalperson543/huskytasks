//https://docs.expo.dev/versions/latest/sdk/checkbox/
import Checkbox from 'expo-checkbox';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
    title: string;
    isChecked: boolean;
    onValueChange: () => void;
}
export default function ItemCheckbox({title, isChecked, onValueChange}: Props) {

  return (
    <View style={styles.section}>
      <Checkbox style={styles.checkbox} value={isChecked} onValueChange={onValueChange} />
      <Text style={styles.paragraph}>{title}</Text>
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
  paragraph: {
    fontSize: 15,
    color: "#fff",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#20d782",
    padding: 10,
    flexGrow: 1
  },
  checkbox: {
    margin: 8,
  },
});
