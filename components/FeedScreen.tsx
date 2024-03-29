import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  RefreshControl,
  SectionList,
} from "react-native";
import Post from "./Post"; // Import the Post component
import { posts } from "../data/DummyData"; // Import your dummy data
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUserVictories } from "../services/victory";
import { useAuth } from "../providers/AuthProvider";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

const groupVictoriesByDate = (victories) => {
  // First, sort victories by their `created_at` timestamps from newest to oldest
  const sortedVictories = victories.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const grouped = sortedVictories.reduce((groups, victory) => {
    const date = formatDate(victory.created_at);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(victory);
    return groups;
  }, {});

  // Convert the grouped object into an array and sort by date, newest first
  const groupedArray = Object.entries(grouped).map(([date, victories]) => ({
    title: date,
    data: victories,
  }));

  return groupedArray.sort((a, b) => new Date(b.title) - new Date(a.title));
};

const FeedScreen = () => {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const router = useRouter();
  const empty = null;
  const { data: victories, refetch: refetchCurrentUserVictories } = useQuery({
    queryKey: ["fetchCurrentUserVictories"],
    queryFn: fetchCurrentUserVictories,
    enabled: currentUser != null, // Enable fetching if accessToken is available
  });
  const showTypeFeed = () => {
    router.push("/typefeed");
  };

  const renderItem = ({ item }) => (
    <Post
      profileImage={"https://i.imgur.com/y1SvStU.png"}
      name={"Banana Cat"}
      text={item.victory_text}
      postImage={null}
      dateTime={item.created_at}
      category={item.category}
      onReply={() => console.log("Reply clicked on post", item.id)}
      onRespect={() => console.log("Respect clicked on post", item.id)}
      onPressType={showTypeFeed}
    />
  );

  const sections = victories ? groupVictoriesByDate(victories) : [];

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 10 }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text>Sorry, no victories to display.</Text>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => refetchCurrentUserVictories()}
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
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 18,
    paddingTop: 20,
    paddingBottom: 5,
    backgroundColor: "#f0f0f0",
    padding: 5,
  },
});

export default FeedScreen;
