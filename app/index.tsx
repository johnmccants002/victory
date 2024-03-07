import { Redirect } from "expo-router";
import React from "react";
import { useAuth } from "../providers/AuthProvider";

type Props = {};

const Page = (props: Props) => {
  const { session } = useAuth();
  return (
    <>
      {session ? (
        <Redirect href={"/(tabs)/"} />
      ) : (
        <Redirect href={"/(auth)/login"} />
      )}
    </>
  );
};

export default Page;
