import { useEffect, useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Button from "~/src/components/Button";
import { supabase } from "~/src/lib/superbase";
import { useAuth } from "~/src/providers/AuthProvider";
import { router } from "expo-router";
import { ResizeMode, Video } from "expo-av";

const defaultImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg";

export default function CreatePost() {
  const { session } = useAuth();
  const [caption, setCaption] = useState("");
  const [media, setMedia] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | undefined>(
    undefined
  );

  useEffect(() => {
    if (!media) {
      pickMedia();
    }
  }, [media]);

  const pickMedia = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      setMedia(result.assets[0].uri);
      setMediaType(result.assets[0].type);
    }
  };

  const uploadMedia = async () => {
    if (!media) {
      return;
    }

    const { data, error } = await supabase
      .from("posts")
      .insert([
        { image:media, caption, user_id: session?.user.id, media_type: mediaType },
      ])
      .select();
  };

  const createPost = async () => {
    uploadMedia();
    router.push("/(tabs)");
  };

  return (
    <View className="p-3 items-center flex-1 ">
      {/* Image Picker */}

      {!media ? (
        <View
          style={{
            width: 300,
            height: 300,
            borderRadius: 150,
            backgroundColor: "#0000",
          }}
        />
      ) : mediaType == "image" ? (
        <Image
          source={{ uri: media }}
          className="w-52 aspect-[3/4] rounded-lg shadow-md"
        />
      ) : (
        <View style={{ flex: 1 }}>
          <Video
            style={{ width: "100%", aspectRatio: 1 }}
            source={{
              uri: media,
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
          />
        </View>
      )}

      <Text onPress={pickMedia} className="text-blue-500 font-semibold m-5">
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
