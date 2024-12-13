import { Text, View } from "react-native";
import { useState } from 'react';
import ItemCheckbox from "@/components/ItemCheckbox";
import { Pressable } from "react-native";

export default function Index() {
  const [isChecked, setChecked] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Huskytasks</Text>
      <ItemCheckbox  title="hello" isChecked={isChecked} onValueChange={() => {setChecked(!isChecked)}}/>
      <Pressable onPress={() => {alert(isChecked)}}><Text>Check value</Text></Pressable>
    </View>
  );
}
