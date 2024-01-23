import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Post from "./Post"; // Import the Post component
import { posts } from "../data/DummyData"; // Import your posts data

interface PostData {
  id: number;
  profileImage: string;
  name: string;
  text: string;
  postImage?: string;
  dateTime: string;
}

interface UserInfo {
  username: string;
  name: string;
  profileImage: string;
}

const ProfileScreen = () => {
  const userInfo: UserInfo = {
    username: "@johndoe",
    name: "John Doe",
    profileImage: "https://i.imgur.com/hCwHtRc.png",
  };

  const renderPost = ({ item }: { item: PostData }) => (
    <Post
      profileImage={item.profileImage}
      name={item.name}
      text={item.text}
      postImage={item.postImage}
      dateTime={item.dateTime}
      onReply={() => console.log("Reply clicked")}
      onRespect={() => console.log("Respect clicked")}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: userInfo.profileImage }}
          style={styles.profileImage}
        />
        <Text style={styles.username}>{userInfo.username}</Text>
        <Text style={styles.name}>{userInfo.name}</Text>
      </View>
      <FlatList
        data={posts} // Assuming all posts belong to this user
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileHeader: {
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  name: {
    fontSize: 16,
    color: "#666",
  },
});

export default ProfileScreen;
