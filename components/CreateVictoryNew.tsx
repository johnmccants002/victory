// screens/CreateVictoryScreen.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import { processToDoList } from "../services/api";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link, useRouter } from "expo-router";
import { useVictories } from "./VictoriesContext";
import { createVictory } from "../services/victory";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CreateVictoryScreen = () => {
  const [victoryText, setVictoryText] = useState("");
  const [victories, setVictories] = useState<object[] | null>(null);
  const { setPreviewVictories } = useVictories();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const data = await createVictory(victoryText);
      console.log("🚀 ~ handleSubmit ~ data:", data);

      alert("Victory created!");
      router.replace("/(tabs)/");
    } catch (error) {
      alert("Failed to generate victories. Please try again.");
    }
  };

  const generateVictories = async () => {
    console.log("GENERATING VICTORIES");
    console.log(victoryText, "THIS IS THE VICTORY TEXT");
    try {
      const data = await processToDoList(victoryText);
      console.log(
        "🚀 ~ generateVictories ~ data:",
        data.victories,
        typeof data.victories
      );
      const parsedData = JSON.parse(data.victories);
      console.log(
        "🚀 ~ generateVictories ~ parsedData:",
        parsedData,
        typeof parsedData
      );

      setPreviewVictories(parsedData.victories);
      setVictories(parsedData.victories);
    } catch {
      console.log("Unable to generate victories");
    }
  };

  return (
    <ScrollView
      style={{
        padding: 20,
        backgroundColor: "white",
      }}
      contentContainerStyle={{
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      {victories ? (
        <View>
          <Text>
            {`Victories generated: ${
              victories.length > 0 ? victories.length : 0
            }`}
          </Text>
          <Link push href={"/preview-victories"} asChild>
            <Pressable>
              <Text>Preview Victories</Text>
            </Pressable>
          </Link>
        </View>
      ) : (
        <View>
          <TextInput
            multiline
            placeholder="Paste your completed to-do list here"
            value={victoryText}
            onChangeText={setVictoryText}
            style={{
              height: 100,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 20,
            }}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View></View>
            <Pressable
              style={{
                flexDirection: "column",
                gap: 4,
                justifyContent: "center",
                alignItems: "center",
                paddingRight: 20,
              }}
              onPress={generateVictories}
            >
              <MaterialCommunityIcons name="codepen" size={30} color={"blue"} />
              <Text style={{ textAlign: "center", fontSize: 10 }}>
                Generate Victories
              </Text>
            </Pressable>
          </View>
        </View>
      )}

      <Button title="Create Victory" onPress={handleSubmit} />
      {/* {victories && <Text style={{ marginTop: 20 }}>{victories}</Text>} */}
    </ScrollView>
  );
};

export default CreateVictoryScreen;
