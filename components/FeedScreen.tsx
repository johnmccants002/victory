import React, { useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
} from "react-native";
import Post from "./Post"; // Import the Post component
import { posts } from "../data/DummyData"; // Import your dummy data

const FeedScreen = () => {
  const [loading, setLoading] = useState(false);
  const empty = null;
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
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator animating={true} color="blue" />
          ) : (
            <View style={styles.empty}>
              <Text>Sorry No Victories to display</Text>
            </View>
          )
        }
        data={empty}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
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

export default FeedScreen;
