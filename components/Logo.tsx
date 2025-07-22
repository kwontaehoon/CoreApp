import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Logo() {
  return (
    <View className="flex flex-row">
      <View className="relative">
        <View className="absolute z-10 bottom-0 -right-1 w-4 h-4 bg-orange-400 rounded-full border-2 border-white"></View>
        <LinearGradient
          colors={["#3B82F6", "#8B5CF6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="w-12 h-12 overflow-hidden rounded-lg flex items-center justify-center shadow-lg"
        >
          <Text className="text-white font-bold text-xl">C</Text>
        </LinearGradient>
      </View>
      <View className="ml-3">
        <Text className="text-3xl font-bold">CoreApp</Text>
        <Text className="text-sm text-gray-500">Your Digital Core</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
