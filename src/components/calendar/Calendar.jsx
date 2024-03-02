import React, { useState } from "react";
import CreateScheduleForm from "@/features/schedule/CreateScheduleForm.jsx";
import { useSchedules } from "@/features/schedule/useSchedules.js";
import Spinner from "@/ui/Spinner.jsx";
import { toast } from "react-hot-toast";
import { useCategory } from "@/features/category/useCategory.js";
import { useGroup } from "@/features/group/useGroup.js";
import Search from "@/ui/Search.jsx";
import MuiModal from "@/ui/MuiModal.jsx";
import CalendarForm from "@/ui/CalendarForm.jsx";

function Calendar() {
  const { categories, isLoadingCategories } = useCategory();
  const { groups, isLoadingGroups } = useGroup();

  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      .toISOString()
      .split("T")[0];
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      .toISOString()
      .split("T")[0];

  // searchParams 상태를 초기화
  const [searchParams, setSearchParams] = useState({
    category: "",
    group: "",
    title: "",
    startDate: firstDayOfMonth,
    endDate: lastDayOfMonth,
  });


  const { isLoading, schedules } = useSchedules(searchParams);

  const [isModal, setIsModal] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null); // 등록을 위한 선택된 날짜
  const [isEdit, setIsEdit] = useState(false);
  const [selectSchedule, setSelectSchedule] = useState({});
  const handleDatesSet = ({ startStr, endStr }) => {
    setSearchParams((prev) => ({
      ...prev,
      startDate: startStr.split("T")[0], // 날짜만 추출
      endDate: endStr.split("T")[0], // 날짜만 추출
    }));
  };

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


  const handleSearch = (searchCriteria) => {
    setSearchParams((prev) => ({
      ...prev, // 기존 상태 유지
      ...searchCriteria, // 새로운 검색 조건 적용
      startDate: searchCriteria.startDate || prev.startDate, // startDate가 없으면 기존 값 유지
      endDate: searchCriteria.endDate || prev.endDate, // endDate가 없으면 기존 값 유지
    }));
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

  if (isLoading || isLoadingCategories || isLoadingGroups) return <Spinner />;
  // 검색 결과가 있으면 filteredSchedules 사용, 없으면 schedules 사용
  const calendarEvents = (schedules).map((schedule) => ({
    title: schedule.details.title,
    start: schedule.start_date,
    end: schedule.end_date,
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
            handleDatesSet={handleDatesSet}
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
