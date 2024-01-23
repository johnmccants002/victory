import React, { useState, useEffect } from "react";

import { TouchableOpacity } from "react-native-gesture-handler";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export interface CurrentUser {
  id: string;
}
const CreateVictoryScreen = () => {
  const [currUser, setCurrUser] = useState<CurrentUser | null>(null);
  const [imageUri, setImageUri] = useState(null);
  const [imgData, setImgData] = useState(null);

  const [victory, setVictory] = useState(null);
  const [victoryText, setVictoryText] = useState("");
  const navigation = useNavigation();

  // S3 Bucket Upload Function

  // Creating Victory Function
  const createVictory = async () => {};

  const handleChooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // if (!result.didCancel) {
    //   setImageUri(result.assets[0].uri);
    //   const response = await fetch(result.assets[0].uri);
    //   const blob = await response.blob();
    //   setImgData(blob);
    // }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Victory text"
        value={victoryText}
        onChangeText={setVictoryText}
      />
      <View
        style={{
          flexDirection: "row-reverse",
          width: "100%",
          marginLeft: 20,
        }}
      >
        <TouchableOpacity onPress={handleChooseImage}>
          <MaterialCommunityIcons
            name="image-plus"
            size={50}
            color={"#5856D6"}
          />
        </TouchableOpacity>
      </View>
      {imageUri && <Image style={styles.image} source={{ uri: imageUri }} />}
      <Button title="Create Victory" onPress={createVictory} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "white",
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    padding: 8,
    width: "100%",
    paddingBottom: 100,
  },
  image: {
    width: "80%",
    height: 80,
    resizeMode: "contain",
    marginBottom: 16,
  },
});

export default CreateVictoryScreen;
