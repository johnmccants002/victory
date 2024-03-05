import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

interface Sponsorship {
  id: string;
  sponsorName: string;
  milestone: string;
  rewardPoints: number;
}

interface SponsorshipItemProps {
  sponsorship: Sponsorship;
  onAccept: () => void;
  onDecline: () => void;
}

const dummySponsorships: Sponsorship[] = [
  {
    id: "s1",
    sponsorName: "Alice Johnson",
    milestone: "Complete 50 Runs",
    rewardPoints: 1000,
  },
  {
    id: "s2",
    sponsorName: "David Smith",
    milestone: "Read 10 Books",
    rewardPoints: 800,
  },
  {
    id: "s3",
    sponsorName: "Emma Wilson",
    milestone: "Finish Coding Course",
    rewardPoints: 1200,
  },
  {
    id: "s4",
    sponsorName: "Michael Brown",
    milestone: "Write 30 Blog Posts",
    rewardPoints: 1500,
  },
  // Add more dummy data as needed
];

const SponsorshipItem: React.FC<SponsorshipItemProps> = ({
  sponsorship,
  onAccept,
  onDecline,
}) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.sponsorName}>{sponsorship.sponsorName}</Text>
      <Text style={styles.milestone}>{sponsorship.milestone}</Text>
      <Text style={styles.points}>
        Reward: {sponsorship.rewardPoints} Points
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.acceptButton]}
          onPress={onAccept}
        >
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.declineButton]}
          onPress={onDecline}
        >
          <Text style={styles.buttonText}>Decline</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PendingSponsorships: React.FC = () => {
  const [sponsorships, setSponsorships] =
    useState<Sponsorship[]>(dummySponsorships);

  const handleAccept = (id: string) => {
    console.log("Accepted sponsorship:", id);
    // Handle acceptance logic
  };

  const handleDecline = (id: string) => {
    console.log("Declined sponsorship:", id);
    // Handle decline logic
  };

  return (
    <FlatList
      data={sponsorships}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <SponsorshipItem
          sponsorship={item}
          onAccept={() => handleAccept(item.id)}
          onDecline={() => handleDecline(item.id)}
        />
      )}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sponsorName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  milestone: {
    fontSize: 16,
    color: "#555",
  },
  points: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: "48%",
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
  },
  declineButton: {
    backgroundColor: "#F44336",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default PendingSponsorships;
