import React, { useState } from "react";
import CreateScheduleForm from "@/features/schedule/CreateScheduleForm.jsx";
import { useSchedules } from "@/features/schedule/useSchedules.js";
import Spinner from "@/ui/Spinner.jsx";
import { toast } from "react-hot-toast";
import { useCategory } from "@/features/category/useCategory.js";
import { useGroup } from "@/features/group/useGroup.js";
import Search from "@/ui/Search.jsx";
import MuiModal from "@/ui/MuiModal.jsx";
import { useQueryClient } from "@tanstack/react-query";
import CalendarForm from "@/ui/CalendarForm.jsx";

function Calendar() {
  const { categories, isLoadingCategories } = useCategory();
  const { groups, isLoadingGroups } = useGroup();
  const queryClient = useQueryClient(); // QueryClient 인스턴스를 가져옵니다.

  const { isLoading, schedules } = useSchedules();
  const [isModal, setIsModal] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null); // 등록을 위한 선택된 날짜
  const [isEdit, setIsEdit] = useState(false);
  const [selectSchedule, setSelectSchedule] = useState({});
  const [filteredSchedules, setFilteredSchedules] = useState([]);

  const handleDateClick = (arg) => {
    const currentTime = new Date().getTime();

    if (lastClickTime && currentTime - lastClickTime < 300) {
      setIsEdit(false);
      setIsModal(true); // 모달을 열기 위해 상태를 true로 설정
      setSelectedDate(new Date(arg.dateStr));
      setLastClickTime(null);
    } else {
      setLastClickTime(currentTime);
    }
  };

  const handleEventClick = ({ event }) => {
    const currentTime = new Date().getTime();

    if (lastClickTime && currentTime - lastClickTime < 300) {
      // 더블 클릭 감지
      const eventId = event.extendedProps.event_id;
      const data = schedules.find((s) => s.event_id === eventId);

      if (!data) {
        toast.error("다시 선택해주세요");
        return;
      }

      setSelectSchedule(data);
      setIsEdit(true);
      setIsModal(true); // 모달 상태를 true로 변경하여 모달을 열기
      setLastClickTime(null); // 마지막 클릭 시간 초기화
    } else {
      setLastClickTime(currentTime); // 현재 시간을 마지막 클릭 시간으로 설정
    }
  };
  const handleSearch = (data) => {
    const schedules = queryClient.getQueryData(["schedules"]);
    const filtered = schedules.filter((schedule) => {
      const isCategoryMatch =
        !data.category || schedule.category_id === data.category;
      const isGroupMatch = !data.group || schedule.group_id === data.group;
      const isTitleMatch =
        !data.title ||
        schedule.details.title.toLowerCase().includes(data.title.toLowerCase());
      return isCategoryMatch && isGroupMatch && isTitleMatch;
    });

    setFilteredSchedules(filtered.length > 0 ? filtered : null); // 검색 결과가 있으면 저장, 없으면 null
  };

  if (isLoading || isLoadingCategories || isLoadingGroups) return <Spinner />;
  // 검색 결과가 있으면 filteredSchedules 사용, 없으면 schedules 사용
  const calendarEvents = (
    filteredSchedules.length > 0 ? filteredSchedules : schedules
  ).map((schedule) => ({
    title: schedule.details.title,
    start: schedule.details.startDate,
    end: schedule.details.endDate,
    color: schedule.details.color,
    event_id: schedule.event_id,
  }));

  return (
    <>
      <Search categories={categories} groups={groups} onSearch={handleSearch} />
      <CalendarForm
        schedules={calendarEvents}
        handleDateClick={handleDateClick}
        handleEventClick={handleEventClick}
      />
      {isModal && (
        <MuiModal open={isModal} handleClose={() => setIsModal(false)}>
          <CreateScheduleForm
            categories={categories}
            groups={groups}
            isEdit={isEdit}
            selectedSchedule={selectSchedule}
            selectedDate={selectedDate}
          />
        </MuiModal>
      )}
    </>
  );
}

export default Calendar;
