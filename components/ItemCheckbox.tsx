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
    <View style={styles.container}>
      <View style={styles.section}>
        <Checkbox style={styles.checkbox} value={isChecked} onValueChange={onValueChange} />
        <Text style={styles.paragraph}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
});
