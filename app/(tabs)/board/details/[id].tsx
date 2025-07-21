import { useBoardDetailsQuery } from "@/hooks/query";
import { useKeyboardHeight } from "@/hooks/useKeyboardHeight";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import EvilIcons from "react-native-vector-icons/EvilIcons";

export default function Details() {
  const keyboardHeight = useKeyboardHeight();
  const { id } = useLocalSearchParams();
  console.log("id: ", id)
  const { data } = useBoardDetailsQuery(id)
  console.log("data: ", data)

  return !data ? '' : (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white" style={{ paddingBottom: keyboardHeight }}>
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View className="flex-1 p-5">
              <ScrollView
                className="flex-1"
                keyboardShouldPersistTaps="handled"
              >
                {/* 프로필 */}
                <View className="flex-row items-center mb-4">
                  <View className="w-12 h-12 rounded-full bg-gray-300 mr-3" />
                  <View>
                    <Text className="text-base font-semibold">사용자1</Text>
                    <Text className="text-xs text-gray-500">2024-01-15 14:30</Text>
                  </View>
                </View>

                {/* 제목 + 본문 */}
                <View className="mb-4">
                  <Text className="text-lg font-bold mb-1">첫 번째 게시글입니다</Text>
                  <Text className="text-sm text-gray-700">
                    안녕하세요! 첫 번째 게시글을 작성해봅니다. 이곳은 자유롭게 소통할 수 있는 공간입니다.
                  </Text>
                </View>

                {/* 이미지 박스 */}
                <View className="h-40 bg-gray-200 border justify-center items-center mb-4 rounded">
                  <Text className="text-gray-500">이미지 박스</Text>
                  <Image 
                  className="w-5 h-5 border"
                  style={{ width: 70, height: 70 }}
                  source={{ uri: data[0]?.images[0]?.url }}
                  resizeMode="contain"
                   />
                </View>

                {/* 좋아요 / 댓글 수 */}
                <View className="flex-row items-center mb-4 space-x-4">
                  <EvilIcons name="heart" size={24} />
                  <Text>123</Text>
                  <EvilIcons name="comment" size={24} />
                  <Text>456</Text>
                </View>

                {/* 댓글 목록 */}
                <Text className="text-sm font-medium mb-2">댓글 3개</Text>
                <View className="bg-gray-100 p-3 rounded mb-2">
                  <Text>사용자2: 좋은 글이네요!</Text>
                </View>
                <View className="bg-gray-100 p-3 rounded mb-2">
                  <Text>사용자3: 감사합니다 :)</Text>
                </View>
                <View className="bg-gray-100 p-3 rounded mb-2">
                  <Text>사용자4: 저도 공유해볼게요</Text>
                </View>
                <View className="bg-gray-100 p-3 rounded mb-2">
                  <Text>사용자4: 저도 공유해볼게요</Text>
                </View>
                <View className="bg-gray-100 p-3 rounded mb-2">
                  <Text>사용자4: 저도 공유해볼게요</Text>
                </View>
                <View className="bg-gray-100 p-3 rounded mb-2">
                  <Text>사용자4: 저도 공유해볼게요</Text>
                </View>
                <View className="bg-gray-100 p-3 rounded mb-2">
                  <Text>사용자4: 저도 공유해볼게요</Text>
                </View>
                <View className="bg-gray-100 p-3 rounded mb-2">
                  <Text>사용자4: 저도 공유해볼게요</Text>
                </View>
                <View className="bg-gray-100 p-3 rounded mb-2">
                  <Text>사용자4: 저도 공유해볼게요</Text>
                </View>
                <View className="bg-gray-100 p-3 rounded mb-2">
                  <Text>사용자4: 저도 공유해볼게요</Text>
                </View>
                <View className="bg-gray-100 p-3 rounded mb-2">
                  <Text>사용자4: 저도 공유해볼게요</Text>
                </View>
                <View className="bg-gray-100 p-3 rounded mb-2">
                  <Text>사용자4: 저도 공유해볼게요</Text>
                </View>
                <View className="bg-gray-100 p-3 rounded mb-2">
                  <Text>사용자4: 저도 공유해볼게요</Text>
                </View><View className="bg-gray-100 p-3 rounded mb-2">
                  <Text>사용자4: 저도 공유해볼게요</Text>
                </View>
                <View className="bg-gray-100 p-3 rounded mb-2">
                  <Text>사용자4: 저도 공유해볼게요</Text>
                </View>
              </ScrollView>

              {/* 댓글 입력창 */}
              <View className="flex-row items-center mt-3 h-12 space-x-3">
                <TextInput
                  className="flex-1 h-full border border-gray-300 rounded px-3 text-sm"
                  placeholder="댓글을 입력하세요"
                  placeholderTextColor="#aaa"
                />
                <View className="w-12 h-12 rounded bg-blue-500" />
              </View>
            </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
