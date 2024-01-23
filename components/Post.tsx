import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface PostProps {
  profileImage: string;
  name: string;
  text: string;
  postImage?: string;
  onReply: () => void;
  onRespect: () => void;
  dateTime: string;
}

const Post: React.FC<PostProps> = ({
  profileImage,
  name,
  text,
  postImage,
  onReply,
  onRespect,
  dateTime,
}) => {
  return (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        <Text style={styles.name}>{name}</Text>
        <TouchableOpacity style={styles.settingsIcon}>
          <FontAwesome name="caret-down" size={20} />
        </TouchableOpacity>
      </View>
      <Text style={styles.postText}>{text}</Text>
      {postImage && (
        <Image source={{ uri: postImage }} style={styles.postImage} />
      )}
      <Text style={styles.dateTime}>{dateTime}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onReply} style={styles.button}>
          <Text>Reply</Text>
          <FontAwesome name="reply" size={20} />
        </TouchableOpacity>
        <View style={styles.vertLine}></View>
        <TouchableOpacity onPress={onRespect} style={styles.button}>
          <Text>Respect</Text>
          <FontAwesome name="thumbs-up" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    fontWeight: "bold",
    flex: 1,
  },
  settingsIcon: {
    padding: 5,
  },
  postText: {
    marginTop: 10,
  },
  postImage: {
    width: "100%",
    height: 200,
    marginTop: 10,
  },
  dateTime: {
    color: "#666",
    fontSize: 12,
    marginTop: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    gap: 16,
  },
  vertLine: {
    height: 20,
    color: "lightgray",
    borderWidth: 0.5,
  },
});

export default Post;
