import { Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { View, Image } from "react-native";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

type Props = {};

const Page = () => {
  const { currentUser, loading } = useAuth();

  console.log("CURRENT LOADING: ", loading);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

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
  return session && session.user ? (
    <Redirect href={"/(tabs)/"} />
  ) : (
    <Redirect href={"/(auth)/login"} />
  );
};

export default Page;
