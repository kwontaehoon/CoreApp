import { useBoardDetailsQuery, useCommentCreateMutation } from "@/hooks/query";
import { useKeyboardHeight } from "@/hooks/useKeyboardHeight";
import { useSessionStore } from "@/store";
import { useLocalSearchParams, useNavigation } from "expo-router";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";

export default function Details() {
  const keyboardHeight = useKeyboardHeight();
  const navigation = useNavigation();
  const session = useSessionStore((state) => state.session);
  const [comment, setComment] = useState("");
  const { id } = useLocalSearchParams();
  const { data: boardDetailList, refetch } = useBoardDetailsQuery(id);
  const { mutateAsync: commentCreate, isSuccess: commentCreateSuccess } =
    useCommentCreateMutation(id, comment, session);

  useEffect(() => {
    const fetchBoard = async () => {
      if (boardDetailList && boardDetailList.length > 0) {
        navigation.setOptions({ title: boardDetailList[0].title });
      }
    };

    fetchBoard();
  }, [boardDetailList]);

  useEffect(() => {
    if (commentCreateSuccess) {
      refetch();
      setComment("");
      Keyboard.dismiss();
    }
  }, [commentCreateSuccess]);

  const send = async () => {
    try {
      await commentCreate();
    } catch (error) {
      Alert.alert("댓글을 다시 입력해주세요.");
    }
  };

  return !boardDetailList ? (
    <ActivityIndicator size={"large"} className="flex-1"/>
  ) : (
    <SafeAreaProvider>
      <SafeAreaView
        className="flex-1 bg-white"
        style={{ paddingBottom: keyboardHeight -50 }}
      >
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="flex-1 p-5">
            <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
              {/* 프로필 */}
              <View className="flex-row items-center mb-4">
                <View className="w-12 h-12 rounded-full bg-gray-300 mr-3" />
                <View>
                  <Text className="text-base font-semibold">
                    {boardDetailList[0].users.name}
                  </Text>
                  <Text className="text-xs text-gray-500">
                    {moment(boardDetailList[0].create_at).format("YYYY-MM-DD")}
                  </Text>
                </View>
              </View>

              {/* 제목 + 본문 */}
              <View className="mb-4">
                <Text className="text-lg font-bold mb-1">
                  {boardDetailList[0].title}
                </Text>
                <Text className="text-sm text-gray-700">
                  {boardDetailList[0].content}
                </Text>
              </View>

              {/* 이미지 박스 */}
              {boardDetailList[0].images.length === 0 ? (
                ""
              ) : (
                <View>
                  <ScrollView
                    horizontal={true}
                    className="h-40 bg-gray-200 mb-12 rounded"
                    contentContainerStyle={{ gap: 10 }}
                    showsHorizontalScrollIndicator={false}
                  >
                    {boardDetailList[0].images.map((image, i) => {
                      return (
                        <Image
                          key={i}
                          className="w-40 h-full"
                          source={{
                            uri: `https://qezlibgkqqiplpjhhdpl.supabase.co/storage/v1/object/public/core-app/${image.url}`,
                          }}
                          resizeMode="cover"
                        />
                      );
                    })}
                  </ScrollView>
                </View>
              )}

              {/* 댓글 목록 */}
              <Text className="text-sm font-medium mb-2">
                댓글 {boardDetailList[0].comments.length}개
              </Text>

              {boardDetailList[0].comments.map((comment) => {
                return (
                  <View
                    key={comment.id}
                    className="bg-gray-100 p-3 rounded mb-2 flex-row"
                  >
                    <Text>{comment.users.name}: </Text>
                    <Text>{comment.content}</Text>
                  </View>
                );
              })}
            </ScrollView>

            {/* 댓글 입력창 */}
            <View className="flex-row items-center mt-3 h-12 space-x-3">
              <TextInput
                className="flex-1 h-full border border-gray-300 rounded px-3 text-sm"
                placeholder="댓글을 입력하세요"
                value={comment}
                placeholderTextColor="#aaa"
                onChangeText={(text) => setComment(text)}
              />
              <TouchableOpacity
                className="w-12 h-12 ml-3 rounded bg-blue-500 items-center justify-center"
                activeOpacity={0.5}
                onPress={send}
              >
                <Feather name="send" color={"white"} />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
