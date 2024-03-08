import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

interface PostProps {
  profileImage: string;
  name: string;
  text: string;
  postImage?: string;
  type?: string;
  onReply: () => void;
  onRespect: () => void;
  onPressType?: () => void;
  dateTime: string;
  category: string;
}

const Post: React.FC<PostProps> = ({
  profileImage,
  name,
  text,
  postImage,
  onReply,
  onRespect,
  dateTime,
  onPressType,
  category,
}) => {
  const handleSettingsPress = () => {
    Alert.alert(
      "Report",
      "Do you want to report this post?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Report", onPress: () => handleReport() },
      ],
      { cancelable: true }
    );
  };

  const handleReport = () => {
    // Perform any additional logic for reporting the post here
    // ...

    // Display a success message
    Alert.alert("Success", "Successfully Reported");
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <Link href="/userprofile" asChild>
          <Pressable>
            {({ pressed }) => (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            )}
          </Pressable>
        </Link>
        <Text style={styles.name}>{name}</Text>
        <TouchableOpacity
          style={styles.settingsIcon}
          onPress={handleSettingsPress}
        >
          <FontAwesome name="caret-down" size={20} />
        </TouchableOpacity>
      </View>
      <Text style={styles.postText}>{text}</Text>
      {postImage && (
        <Image source={{ uri: postImage }} style={styles.postImage} />
      )}
      <Text style={styles.dateTime}>{formatDate(dateTime)}</Text>
      <View
        style={{
          width: "auto",

          height: 40,
          justifyContent: "space-between",
          flexDirection: "row",
          padding: 8,
        }}
      >
        <View></View>
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "auto",

            borderRadius: 8,
            paddingHorizontal: 12,
            backgroundColor: "skyblue",
          }}
          onPress={onPressType}
        >
          <Text style={{ color: "white" }}>{category}</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.actions}>
        <TouchableOpacity onPress={onReply} style={styles.button}>
          <Text>Reply</Text>
          <FontAwesome name="reply" size={20} />
        </TouchableOpacity>
        <View style={styles.vertLine}></View>
        <TouchableOpacity onPress={onRespect} style={styles.button}>
          <Text>Respect</Text>
          <FontAwesome name="thumbs-up" size={20} />
        </TouchableOpacity>
      </View> */}
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
