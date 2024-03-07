import { Redirect } from "expo-router";
import React, { useEffect } from "react";
import { useAuth } from "../providers/AuthProvider";
import { View, Image } from "react-native";

type Props = {};

const Page = () => {
  const { currentUser, loading } = useAuth();

  console.log("CURRENT LOADING: ", loading);

  useEffect(() => {
    console.log(loading, "THIS IS THE LOADING");
    console.log(currentUser, "THIS IS THE CURRENT USER");
  }, [loading]);

  if (loading) {
    // Render loading indicator
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image source={require("../assets/images/splash.png")} />
        {/* Or any other loading indicator you prefer */}
      </View>
    );
  }

  // Your existing logic for redirect based on currentUser
  return currentUser ? (
    <Redirect href={"/(tabs)/"} />
  ) : (
    <Redirect href={"/(auth)/login"} />
  );
};

export default Page;
