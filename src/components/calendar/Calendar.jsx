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

function Calendar() {
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
      setSelectedDate(arg.dateStr);

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
        events={[
          {
            title: "event 1",
            start: "2024-02-10",
            end: "2024-02-13",
            color: "#ff9f89",
          },
          {
            title: "event 2",
            start: "2024-02-10T12:00:00",
            end: "2024-02-10T14:00:00",
            color: "#fbd75b",
          },
          {
            title: "event 3",
            start: "2024-02-10T15:00:00",
            end: "2024-02-10T17:00:00",
            color: "#a4bdfc",
          },
          { title: "event 4", start: "2024-02-11", color: "#7ae7bf" }, // 종료 날짜가 없는 경우 시작 날짜만으로 하루 종일 이벤트로 처리됩니다.
        ]}
        locale={koLocale}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
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
