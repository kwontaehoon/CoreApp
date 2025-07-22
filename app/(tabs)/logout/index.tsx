import Logo from "@/components/Logo";
import { useUserNameQuery } from "@/hooks/query";
import { supabase } from "@/lib/supabase";
import { useSessionStore } from "@/store";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function LogoutScreen() {
  const router = useRouter();
  const session = useSessionStore((state) => state.session);
  const { data: userData } = useUserNameQuery(session);
  console.log("userData: ", userData);

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert(error);
    }
  }

  return !userData ? (
    <ActivityIndicator size={"large"} className="flex-1" />
  ) : (
    <View className="flex-1 items-center justify-center p-5">
      <Logo />

      <Text className="text-4xl font-bold my-5">로그아웃</Text>
      <Text className="text-gray-500">정말로 로그아웃 하시겠습니까?</Text>
      <Text className="text-gray-500">모든 세션이 종료됩니다.</Text>
      <View className="w-full bg-white h-20 rounded-lg flex-row items-center p-5 my-5">
        <View className="w-12 h-12 bg-blue-500 rounded-full mr-3 items-center justify-center">
          <Text className="text-white text-xl font-bold">{userData.name.substring(0, 1)}</Text>
        </View>
        <View>
          <Text>{userData.name}</Text>
          <Text className="text-gray-500">{userData.email}</Text>
        </View>
      </View>

      <Button
        mode="contained"
        className="rounded-lg w-full font-bold"
        style={{ borderRadius: 8, backgroundColor: "red" }}
        onPress={() => signOut()}
      >
        로그아웃
      </Button>

      <Text className="my-5">다른 계정으로 로그인하시겠습니까?</Text>
      <Text
        className="text-blue-500 font-bold"
        onPress={() => router.push("/login")}
      >
        다른 계정으로 로그인
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
