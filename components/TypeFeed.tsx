import React, { useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  RefreshControl,
} from "react-native";
import Post from "./Post"; // Import the Post component
import { posts } from "../data/DummyData";

type Props = {};

const TypeFeed = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const renderItem = ({ item }) => (
    <Post
      profileImage={item.profileImage}
      name={item.name}
      text={item.text}
      postImage={item.postImage}
      dateTime={item.dateTime}
      onReply={() => console.log("Reply clicked on post", item.id)}
      onRespect={() => console.log("Respect clicked on post", item.id)}
    />
  );
  return (
    <View style={styles.container}>
      <FlatList
        style={{ paddingHorizontal: 10, paddingTop: 10 }}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator animating={true} color="blue" />
          ) : (
            <View style={styles.empty}>
              <Text>Sorry No Victories to display</Text>
            </View>
          )
        }
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => console.log("Grabbing new posts")}
          />
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Adjust the background color as needed
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
  },
});
export default TypeFeed;
