import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import postss from "~/assets/data/posts.json";
import PostListItem from "~/src/components/PostListItem";
import { supabase } from "~/src/lib/superbase";

export default function FeedScreen() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    let { data, error } = await supabase
      .from("posts")
      .select("*, user:profiles(*)");
    console.log(data);
    setPosts(data);
  };
  if (!posts) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      contentContainerStyle={{ gap: 10, maxWidth: 512, width: "100%" }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <PostListItem post={item} />}
    />
  );
}
