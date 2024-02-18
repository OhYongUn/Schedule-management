import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // 일별 그리드 뷰 플러그인
import timeGridPlugin from "@fullcalendar/timegrid"; // 주간 및 일간 뷰 플러그인
import interactionPlugin from "@fullcalendar/interaction"; // interaction plugin 임포트

import koLocale from "@fullcalendar/core/locales/ko";
import React, { useRef, useState } from "react";
import "./calendar.css";
import ScheduleModal from "@/features/schedule/ScheduleModal.jsx";
import CreateScheduleForm from "@/features/schedule/CreateScheduleForm.jsx";
import EditScheduleForm from "@/features/schedule/EditScheduleForm.jsx";
import { useSchedules } from "@/features/schedule/useSchedules.js";
import Spinner from "@/ui/Spinner.jsx";

function Calendar() {
  const { isLoading, schedules } = useSchedules();

  const buttonRef = useRef(null); // 버튼 참조 생성
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [lastClick, setLastClick] = useState(null);
  const [lastClickTime, setLastClickTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null); // 등록을 위한 선택된 날짜
  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleDateClick = (arg) => {
    const currentTime = new Date().getTime();

    if (lastClickTime && currentTime - lastClickTime < 300) {
      setIsOpenAddModal(true);
      setSelectedDate(new Date(arg.dateStr));
      setTimeout(() => {
        buttonRef.current?.click();
      }, 0);
      setLastClickTime(null);
    } else {
      setLastClickTime(currentTime);
    }
  };
  const handleEventClick = ({ event }) => {
    const clickTime = new Date(); // 현재 클릭의 시간

    if (lastClick && clickTime - lastClick < 300) {
      setIsOpenEditModal(true);
      setSelectedEventId(event.id); // 클릭한 이벤트의 ID 저장

      setTimeout(() => {
        buttonRef.current?.click();
      }, 0);
      setLastClick(null);
    } else {
      setLastClick(clickTime);
    }
  };
  if (isLoading) return <Spinner />;
  const calendarEvents = schedules.map(schedule => ({
    title: schedule.details.title, // details 객체 내의 title 참조
    start: schedule.details.startDate, // details 객체 내의 startDate 참조
    end: schedule.details.endDate, // details 객체 내의 endDate 참조
    color: schedule.details.color // details 객체 내의 color 참조
  }));

  console.log("calendarEvents", calendarEvents);
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={calendarEvents}
        locale={koLocale}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventContent={(eventInfo) => {
          // 이벤트 타이틀만 표시하고 싶을 때 커스텀 렌더링
          return { html: `<b>${eventInfo.event.title}</b>` };
        }}
      />
      {isOpenAddModal && (
        <ScheduleModal buttonRef={buttonRef} modalName="schedule-form">
          <CreateScheduleForm selectedDate={selectedDate} />
        </ScheduleModal>
      )}
      {isOpenEditModal && (
        <ScheduleModal buttonRef={buttonRef} modalName="edit-schedule-form">
          <EditScheduleForm eventId={selectedEventId} />
        </ScheduleModal>
      )}
    </>
  );
}

export default Calendar;
