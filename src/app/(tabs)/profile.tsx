import { useEffect, useState } from "react";
import { Alert, Image, Text, TextInput, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Button from "~/src/components/Button";
import { supabase } from "~/src/lib/superbase";
import { useAuth } from "~/src/providers/AuthProvider";
import CustomTextInput from "~/src/components/CustomTextInput";

const defaultImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg";

export default function ProfileScreen() {
  const { session, user } = useAuth();
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    let { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session?.user.id)
      .single();

    setUsername(profile.username);
    setFullName(profile.full_name);
  };

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(null || String);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const updateProfile = async () => {
    if (!user) {
      return;
    }

    const { data, error } = await supabase.from("profiles").upsert({
      id: user.id,
      username,
      full_name: fullName,
      avatar_url: image,
    });

    if (error) {
      Alert.alert("error Updating profile");
    }
  };

  return (
    <View style={{ padding: 3, flex: 1 }}>
      {/* Image Picker */}
      <View style={{ alignSelf: "center" }}>
        <Image
          source={{ uri: image ? image : defaultImage }}
          className="w-52 aspect-square rounded-full shadow-md"
        />

        <Text
          onPress={pickImage}
          className="text-blue-500 font-semibold m-5 self-center"
        >
          Change
        </Text>
      </View>
      {/* Text Inpute */}
      <View className="w-full gap-4">
        <CustomTextInput
          label="Username"
          placeholder="username"
          value={username}
          onChangeText={setUsername}
        />
        <CustomTextInput
          label={"Full Name"}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>
      {/* Submit Button */}
      <View className="w-21" style={{}}>
        <Button onPress={updateProfile} title="Update Profile" />
        <Button onPress={() => supabase.auth.signOut()} title="Sign Out" />
      </View>
    </View>
  );
}
