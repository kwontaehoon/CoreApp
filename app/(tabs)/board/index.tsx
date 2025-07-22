import { useBoardQuery } from "@/hooks/query";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import moment from "moment";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import EvilIcons from "react-native-vector-icons/EvilIcons";

export default function BoardScreen() {
  const router = useRouter();
  const isFocused = useIsFocused();

  const { data: boardList, isLoading, refetch } = useBoardQuery();

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  return isLoading ? (
    <ActivityIndicator size={"large"} className="flex-1" />
  ) : (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <ScrollView className="px-5 my-5" showsVerticalScrollIndicator={false}>
          {boardList?.map((board, i) => (
            <TouchableOpacity
              key={i}
              className="border-b border-gray-200 bg-white rounded-lg justify-center gap-2 p-4"
              onPress={() =>
                router.push({
                  pathname: "/board/details/[id]",
                  params: { id: board.id },
                })
              }
            >
              <View className="flex-row items-center">
                <Text className="text-lg font-bold mr-3">{board.title}</Text>
                {board.images.length === 0 ? (
                  ""
                ) : (
                  <Text className="bg-green-200 px-2 py-1 text-sm text-green-600 font-bold rounded-lg">
                    이미지
                  </Text>
                )}
              </View>
              <Text className="text-gray-500">{board.content}</Text>
              <View className="flex-row items-center relative">
                <View className="flex-row items-center absolute right-0 gap-1">
                  <EvilIcons name="comment" size={20} />
                  <Text>{board.comments.length}</Text>
                </View>
                <View className="mr-3">
                  <Text className="text-gray-500">{board.users.name}</Text>
                </View>
                <View className="flex-row">
                  <View>
                    <Text className="text-gray-500">
                      {moment(board.users.created_at).format("YYYY-MM-DD")}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
