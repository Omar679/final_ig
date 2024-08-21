import { Text, TextInput } from "react-native";

export default function CustomTextInput({ label, ...textProps }) {
  return (
    <>
      <Text> {label} </Text>
      <TextInput
        className="border p-3 rounded-md border-gray-300"
        {...textProps}
      />
    </>
  );
}
