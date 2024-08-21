import { useEffect, useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Button from "~/src/components/Button";
import { supabase } from "~/src/lib/superbase";
import { useAuth } from "~/src/providers/AuthProvider";
import { router } from "expo-router";

const defaultImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg";

export default function CreatePost() {
  const { session } = useAuth();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(String);

  useEffect(() => {
    if (!image) {
      pickImage();
    }
  }, [image]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      const originalUri = result.assets[0].uri;
      setImage(originalUri);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      return;
    }

    const { data, error } = await supabase
      .from("posts")
      .insert([{ image, caption, user_id: session?.user.id }])
      .select();
  };

  const createPost = async () => {
    uploadImage();
    router.push("/(tabs)");
  };

  return (
    <View className="p-3 items-center flex-1 ">
      {/* Image Picker */}
      <Image
        source={{ uri: image ? image : defaultImage }}
        className="w-52 aspect-[3/4] rounded-lg shadow-md"
      />

      <Text onPress={pickImage} className="text-blue-500 font-semibold m-5">
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
      <Button title="Post" onPress={createPost} />
    </View>
  );
}
