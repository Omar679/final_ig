import { FlatList, Image, Text, View } from "react-native";
import posts from "~/assets/data/posts.json";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import PostListItem from "~/src/components/PostListItem";

export default function FeedScreen() {
  return (
    <FlatList
      data={posts}
      className="max-w-lg"
      contentContainerStyle={{ gap: 10, maxWidth: 512, width: "100%" }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <PostListItem post={item} />}
    />
  );
  // return (
  //   <View>
  //
  //     <PostListItem post ={posts[1]} />
  //   </View>
  // );
}
