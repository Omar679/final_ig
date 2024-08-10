import { Image, Text, View } from "react-native";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";
export default function PostListItem({ post }) {
  return (
    <View className="bg-white">
      {/* Header */}
      <View className=" p-3 flex-row gap-2 items-center">
        <Image
          source={{ uri: post.user.image_url }}
          className="w-12 aspect-[4/3] rounded-full"
        />
        <Text className="font-semibold"> {post.user.username}</Text>
      </View>
      <Image
        source={{ uri: post.image_url }}
        className="w-full aspect-square"
      />
      <View className="flex-row gap-3 p-3 ">
        <AntDesign name="hearto" size={20} color="black" />
        <Ionicons name="chatbubble-outline" size={20} />
        <Feather name="send" size={20} />

        <Feather name="bookmark" size={20} style={{ marginLeft: "auto" }} />
      </View>
    </View>
  );
}
