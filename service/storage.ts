import { supabase } from "@/lib/supabase";
import moment from "moment";

export const uploadMultipleImages = async (
  files: FileList | File[],
  fileName,
  session
) => {
  const uploadPromises = Array.from(files).map(async (file, i) => {
    let newFormData = new FormData();
    const formattedTime = moment().format('YYYYMMDD_HHmm');
    const filePath = `${formattedTime}-${session.user.id}-${fileName[i]}`;
    const fileType = file.split(".").pop();

    newFormData.append("file", {
      uri: file,
      name: `image.${fileType}`,
      type: `image/${fileType}`,
    } as any);

    const { data, error } = await supabase.storage
      .from("core-app")
      .upload(filePath, newFormData, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error || !data) {
      console.error(`${file.name} 업로드 실패:`, error?.message);
      return null;
    }

    return data;
  });

  const results = await Promise.all(uploadPromises);
  return results.filter((res) => res !== null);
};
