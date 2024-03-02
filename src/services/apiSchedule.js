import supabase, { supabaseUrl } from "./supabase";
import { v4 as uuidv4 } from "uuid";
let query = supabase.from("events");

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
  const eventData = {
    group_id: newSchedule.group_id,
    category_id: newSchedule.category_id,
    start_date:newSchedule.start_date,
    end_date:newSchedule.end_date,
    user_id:newSchedule.user_id,
    details: JSON.stringify(details),
  };

  if (!id) {
    // 새 이벤트 생성
    const { data, error } = await query.insert([eventData]);
    if (error) throw new Error("이벤트 생성 실패");console.log(error);
    return data;
  } else {
    // 기존 이벤트 수정
    const { data, error } = await query.update(eventData).eq("event_id", id);
    if (error) throw new Error("이벤트 수정 실패");
    return data;
  }
}

export async function getSchedules(searchParams){
  debugger;
  const { startDate, endDate, category, group, title } = searchParams;

  let query = supabase
      .from('events')
      .select('*')
      .gte('start_date', startDate)
      .lte('start_date', endDate)
      .or(`end_date.gte.${startDate},end_date.lte.${endDate}`);

  // 추가 검색 조건이 있는 경우, 쿼리에 포함합니다.
  if (category) {
    query = query.eq('category_id', category);
  }
  if (group) {
    query = query.eq('group_id', group);
  }
  if (title) {
    query = query.ilike('details->>title', `%${title}%`); // 'details' 컬럼 내의 'title' 필드를 대소문자 구분 없이 검색

  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching schedules:", error);
    throw error;
  }
  const parsedData = data.map(event => {
    const details = event.details ? JSON.parse(event.details) : {};
    return {
      ...event,
      details,
    };
  });
  return parsedData;

}
