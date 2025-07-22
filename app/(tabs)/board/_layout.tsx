import { Stack, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function BoardLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "게시글",
          headerRight: () => (
            <TouchableOpacity
              className="rounded-lg bg-blue-500 w-8 h-8 items-center justify-center"
              onPress={() => router.push("/board/write")}
            >
              <Ionicons name="add" size={20} color={"white"} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen name="details/[id]" />
      <Stack.Screen name="write"
        options={{
            title: "글 작성"
        }} />
    </Stack>
  );
}

const styles = StyleSheet.create({});
