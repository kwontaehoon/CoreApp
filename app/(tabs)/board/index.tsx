import { useBoardQuery } from "@/hooks/query";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import moment from "moment";

export default function BoardScreen() {
  const router = useRouter();

  const { data: boardList, isLoading } = useBoardQuery()

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if(error){
      Alert.alert(error)
    }
  }

  return isLoading ? '' : (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <ScrollView className="px-5 my-5">
          {boardList?.map((board, i) => (
            <TouchableOpacity
              key={i}
              className="border-b border-gray-200 bg-white rounded-lg justify-center gap-2 p-4"
              onPress={() => router.push({ pathname: "/board/details/[id]", params: { id: board.id } })}
            >
              <Text className="text-lg font-bold">{board.title}</Text>
              <Text>{board.content}</Text>
              <View className="flex-row items-center relative">
                <View className="flex-row items-center absolute right-0 gap-1">
                  <EvilIcons name="comment" size={20} />
                  <Text>{board.comments.length}</Text>
                </View>
                <View className="mr-1">
                  <Text>{board.users.name}</Text>
                </View>
                <View className="flex-row">
                  <View className="">
                    <Text>{moment(board.users.created_at).format("YYYY-MM-DD")}</Text> 
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
