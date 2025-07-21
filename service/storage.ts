import { supabase } from "@/lib/supabase";

export const uploadMultipleImages = async (files: FileList | File[], fileName) => {
  const uploadPromises = Array.from(files).map(async (file) => {
    // const filePath = `${Date.now()}-${fileName}`;
    const response = await fetch(files);
    const blob = await response.blob();
    const filePath = files;
    console.log(response, blob)

    const { data, error } = await supabase.storage
      .from("core-app")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });
      console.log("data: ", data)

    if (error || !data) {
      console.error(`${file.name} 업로드 실패:`, error?.message);
      return null;
    }

    console.log(456789)
    return data
  });

  const results = await Promise.all(uploadPromises);
  return results.filter((res) => res !== null);
};