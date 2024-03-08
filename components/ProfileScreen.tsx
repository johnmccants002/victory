import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Pressable,
  useColorScheme,
  ScrollView,
} from "react-native";
import Colors from "../constants/Colors";

import Post from "./Post"; // Import the Post component
import { posts } from "../data/DummyData"; // Import your posts data
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUserProfile } from "../services/profile";
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
  const { data: profile, refetch: refetchCurrentUserVictories } = useQuery({
    queryKey: ["fetchCurrentUserProfile"],
    queryFn: fetchCurrentUserProfile,
    enabled: true, // Enable fetching if accessToken is available
  });

  const userInfo: UserInfo = {
    username: "@johndoe",
    name: "John Doe",
    profileImage: "https://i.imgur.com/hCwHtRc.png",
  };

  useEffect(() => {
    console.log("🚀 ~ ProfileScreen ~ profile:", profile);
  }, [profile]);
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <Image
            source={{
              uri: profile.photo_url ? profile.photo_url : "default_image_uri",
            }} // Replace "default_image_uri" with your actual placeholder image URI
            style={styles.profileImage}
          />
          <Text style={styles.username}>{userInfo.username}</Text>
          <Text
            style={styles.name}
          >{`${profile.first_name} ${profile.last_name}`}</Text>
        </View>
        <View style={styles.aboutSection}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.aboutText}>{profile.about_me}</Text>
          {/* Assuming 'about_me' is the field in your profile object */}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  profileHeader: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  name: {
    fontSize: 16,
    color: "grey",
  },
  aboutSection: {
    marginTop: 20,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 16,
    color: "grey",
    lineHeight: 24,
    textAlign: "justify",
  },
});

export default ProfileScreen;
