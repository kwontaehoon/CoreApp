import { useBoardCreateMutation, useUploadImagesToBucketMutation } from "@/hooks/query";
import { useKeyboardHeight } from "@/hooks/useKeyboardHeight";
import { useSessionStore } from "@/store";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { If } from "react-haiku";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function BoardWrite() {
  const keyboardHeight = useKeyboardHeight();
  const session = useSessionStore((state) => state.session)
  const [boardInfo, setBoardInfo] = useState({
    title: "",
    content: "",
  });

  const [images, setImages] = useState<string[]>([]);
  const [imagesFileName, setImagesFileName] = useState([])
  const { mutateAsync: boardCreate } = useBoardCreateMutation(boardInfo, images, imagesFileName, session);
  const { mutateAsync: uploadImagesToBucket } = useUploadImagesToBucketMutation(images, imagesFileName)

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.status !== "granted") {
      Alert.alert("권한 필요", "이미지 접근 권한이 필요합니다.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
      allowsEditing: false,
    });

    if (!result.canceled) {
      console.log(result.assets[0])
      const newImageUri = result.assets[0].uri;
      const newImageFileName = result.assets[0].fileName

      if (images.length >= 5) {
        Alert.alert("제한", "최대 5장의 이미지만 선택할 수 있습니다.");
        return;
      }

      setImages([...images, newImageUri]);
      setImagesFileName([...imagesFileName, newImageFileName]);
    }
  };

  const imageDelete = (index: number) => {
    setImages(images.filter((_, i) => index !== i));
  };

  const write = async () => {
    await boardCreate();
    await uploadImagesToBucket();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        className="flex-1 p-5 bg-white"
        style={{ paddingBottom: keyboardHeight }}
      >
        <ScrollView>
          <View className="mb-5">
            <Text>제목</Text>
            <TextInput
              className="border mt-2 h-12 rounded border-gray-300"
              onChangeText={(text) =>
                setBoardInfo({ ...boardInfo, title: text })
              }
            ></TextInput>
          </View>

          <View className="mb-5">
            <Text>내용</Text>
            <TextInput
              multiline
              textAlign="left"
              textAlignVertical="top"
              onChangeText={(text) =>
                setBoardInfo({ ...boardInfo, content: text })
              }
              className="border mt-2 h-[300px] rounded border-gray-300"
            ></TextInput>
          </View>

          <View className="mb-5">
            <Text>이미지 첨부 (최대 5개)</Text>

            {/* image가 없으면 */}
            <If isTrue={images.length === 0}>
              <TouchableOpacity
                activeOpacity={1}
                className="border items-center justify-center gap-1 mt-2 h-40 rounded border-gray-300"
                onPress={pickImage}
              >
                <View className="items-center justify-center">
                  <Feather name="image" size={24} color={"gray"} />
                  <Text className="text-gray-400">
                    클릭하여 이미지를 선택하세요
                  </Text>
                  <Text className="text-gray-400">JPG, PNG 파일 지원</Text>
                </View>
              </TouchableOpacity>
            </If>

            {/* image가 있으면 */}
            <If isTrue={images.length !== 0}>
              <ScrollView
                horizontal={true}
                className="mt-2"
                contentContainerStyle={{ gap: 10 }}
                showsHorizontalScrollIndicator={false}
              >
                {images.map((uri, index) => (
                  <View key={uri} className="relative w-40 h-40">
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => imageDelete(index)}
                      className="w-5 h-5 rounded-full border bg-black items-center justify-center absolute right-1 top-1 z-10"
                    >
                      <Ionicons name="close" color={"white"} />
                    </TouchableOpacity>
                    <Image
                      source={{ uri }}
                      className="w-full h-full rounded"
                      resizeMode="cover"
                    />
                  </View>
                ))}
                {/* image가 최대 갯수라면 */}
                <If isTrue={images.length < 5}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={pickImage}
                    className="border border-gray-300 rounded w-40 h-40 items-center justify-center"
                  >
                    <Ionicons name="add" size={40} color={"gray"} />
                  </TouchableOpacity>
                </If>
              </ScrollView>
            </If>
          </View>

          <TouchableOpacity
            className="items-center justify-center h-12 rounded bg-blue-500"
            onPress={write}
          >
            <Text className="text-white">게시글 작성</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
