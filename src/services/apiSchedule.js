import supabase, { supabaseUrl } from "./supabase";
import { v4 as uuidv4 } from "uuid";

export async function createEditSchedule(newSchedule, id) {
  let imagePath = "";
  let originalFileName = "";

  // 이미지 파일 처리
  if (newSchedule.image && newSchedule.image instanceof File) {
    originalFileName = newSchedule.image.name;
    const imageName = `${uuidv4()}-${originalFileName}`;
    imagePath = `event-image/${imageName}`;

    // Supabase Storage에 이미지 업로드
    const { error: uploadError } = await supabase.storage
        .from("event-image")
        .upload(imageName, newSchedule.image);

    if (uploadError) {
      console.error(uploadError);
      throw new Error("이미지 업로드 실패");
    }

    imagePath = `${supabaseUrl}/storage/v1/object/public/${imagePath}`;
  }

  // details 객체 내에 이미지 정보 포함
  const details = {
    ...JSON.parse(newSchedule.details),
    imagePath: imagePath,
    originalFileName: originalFileName,
  };

  let eventData = {
    group_id: newSchedule.group_id,
    category_id: newSchedule.category_id,
    details: JSON.stringify(details),
  };

  let query = supabase.from("events");

  if (!id) {
    // 새 이벤트 생성
    const { data, error } = await query.insert([eventData]);
    if (error) throw new Error("이벤트 생성 실패");
    return data;
  } else {
    // 기존 이벤트 수정
    const { data, error } = await query.update(eventData).eq("id", id);
    if (error) throw new Error("이벤트 수정 실패");
    return data;
  }
}

