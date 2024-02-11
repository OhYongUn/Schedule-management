import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // 일별 그리드 뷰 플러그인
import timeGridPlugin from "@fullcalendar/timegrid"; // 주간 및 일간 뷰 플러그인
import interactionPlugin from "@fullcalendar/interaction"; // interaction plugin 임포트

import koLocale from "@fullcalendar/core/locales/ko";
import { useState } from "react";
import Modal from "../../ui/Modal.jsx";
import "./calendar.css";

function Calendar() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleDateClick = (arg) => {
    setIsOpenModal(!isOpenModal);
    console.log("isOpenModal", isOpenModal);
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
          { title: "event 1", date: "2024-02-10" },
          { title: "event 2", date: "2024-02-11" },
        ]}
        locale={koLocale}
        dateClick={handleDateClick}
      />
      {isOpenModal && (
          <Modal.Window name="edit">
            <h1>Modal</h1>
          </Modal.Window>
      )}
    </>
  );
}

export default Calendar;
