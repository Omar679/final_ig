import { FlatList, Image, Text, View } from "react-native";
import posts from "~/assets/data/posts.json";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import PostListItem from "~/src/components/PostListItem";

export default function FeedScreen() {
  return (
    <FlatList
      data={posts}
      contentContainerStyle={{ gap: 10 }}
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
