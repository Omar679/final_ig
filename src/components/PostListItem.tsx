import { Image, Text, View, useWindowDimensions } from "react-native";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import { ResizeMode, Video } from "expo-av";

export default function PostListItem({ post }: { post: any }) {
  //Post Image

  return (
    <View className="bg-white">
      {/* Header */}
      <View className=" p-3 flex-row gap-2 items-center">
        <Image
          source={{ uri: post.user.avatar_url }}
          className="w-8 h-8 rounded-full"
        />
        <Text className="font-semibold"> {post.user.username} </Text>
      </View>
      {post.media_type == "image" ? (
        <Image source={{ uri: post.image }} className="w-full aspect-square" />
      ) : (
        <Video
          style={{ width: "100%", aspectRatio: 1 }}
          source={{
            uri: post.image,
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
        />
      )}
      <View className="flex-row gap-3 p-3 ">
        <AntDesign name="hearto" size={20} color="black" />
        <Ionicons name="chatbubble-outline" size={20} />
        <Feather name="send" size={20} />
        <Feather name="bookmark" size={20} style={{ marginLeft: "auto" }} />
      </View>
      <Text>{post.caption}</Text>
    </View>
  );
}
