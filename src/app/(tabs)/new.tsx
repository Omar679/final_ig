import { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";

const defaultImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg";

export default function CreatePost() {
  const [caption, setCaption] = useState("");
  return (
    <View className="p-3 items-center flex-1 ">
      {/* Image Picker */}
      <Image
        source={{ uri: defaultImage }}
        className="w-52 aspect-[3/4] rounded-lg shadow-md"
      />

      <Text onPress={() => {}} className="text-blue-500 font-semibold m-5">
        Change
      </Text>
      {/* Text Inpute */}
      <TextInput
        placeholder="Whats on your mind?"
        className=" w-full p-3"
        value={caption}
        onChangeText={(value) => setCaption(value)}
      />
      {/* Submit Button */}
      <Pressable style={{marginTop:'auto'}} className="bg-blue-500 p-4 items-center rounded-md w-full ">
        <Text className="text-white font-semibold">Share</Text>
      </Pressable>
    </View>
  );
}
